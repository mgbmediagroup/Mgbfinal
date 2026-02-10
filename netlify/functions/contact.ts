import { Handler } from '@netlify/functions';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormData {
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  message: string;
}

async function sendContactEmail(formData: ContactFormData, retryCount = 0) {
  const maxRetries = 2;
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'MGB Media Group <onboarding@resend.dev>', // Using Resend's verified domain for better deliverability
      to: ['mgbmediagroup@gmail.com'], // Your email where you want to receive messages
      reply_to: formData.email, // Set reply-to as the form submitter's email
      subject: `New Contact Form Submission from ${formData.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${formData.fullName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
            ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #555;">${formData.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 8px; font-size: 12px; color: #666;">
            <p>This email was sent from the contact form on mgbmediagroup.com</p>
            <p>Sent at: ${new Date().toLocaleString()}</p>
            <p><strong>Reply directly to this email to respond to ${formData.fullName}</strong></p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${formData.fullName}
        Email: ${formData.email}
        ${formData.company ? `Company: ${formData.company}` : ''}
        ${formData.phone ? `Phone: ${formData.phone}` : ''}
        
        Message:
        ${formData.message}
        
        Sent from: mgbmediagroup.com
        Time: ${new Date().toLocaleString()}
        
        Reply directly to this email to respond to ${formData.fullName}
      `,
    });

    if (error) {
      console.error('Resend error details:', {
        error,
        formData: { ...formData, message: '[truncated]' }, // Log form data without full message for debugging
        timestamp: new Date().toISOString()
      });
      throw new Error(`Email service error: ${error.message || 'Unknown error'}`);
    }

    console.log('Email sent successfully:', {
      emailId: data?.id,
      to: 'mgbmediagroup@gmail.com',
      from: formData.email,
      timestamp: new Date().toISOString()
    });

    return { success: true, data };
  } catch (error) {
    console.error('Contact form error:', error);
    
    // Retry logic for temporary failures
    if (retryCount < maxRetries && error instanceof Error) {
      const isRetryableError = error.message.includes('timeout') || 
                              error.message.includes('network') ||
                              error.message.includes('rate limit');
      
      if (isRetryableError) {
        console.log(`Retrying email send (attempt ${retryCount + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))); // Exponential backoff
        return sendContactEmail(formData, retryCount + 1);
      }
    }
    
    throw new Error('Failed to send contact email');
  }
}

export const handler: Handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse the request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Request body is required' }),
      };
    }

    const formData: ContactFormData = JSON.parse(event.body);

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required fields: fullName, email, and message are required' 
        }),
      };
    }

    // Validate email format (more comprehensive)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(formData.email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Please enter a valid email address' }),
      };
    }

    // Sanitize input data
    const sanitizedData = {
      fullName: formData.fullName.trim(),
      company: formData.company?.trim() || '',
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone?.trim() || '',
      message: formData.message.trim()
    };

    // Send the email
    const result = await sendContactEmail(sanitizedData);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        data: result.data 
      }),
    };

  } catch (error) {
    console.error('Contact function error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to send email',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};