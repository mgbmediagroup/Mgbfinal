// Simple test script to check Resend API
import { Resend } from 'resend';

// Using environment variable for security
const resend = new Resend(process.env.RESEND_API_KEY);

async function testResend() {
  try {
    console.log('Testing Resend API...');
    
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY environment variable is not set');
      console.log('Please set RESEND_API_KEY in your environment or .env.local file');
      return;
    }
    
    // Test with fallback sender (no domain verification needed)
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Using Resend's default sender
      to: ['mgbmediagroup@gmail.com'],
      subject: 'Test Email from MGB Website',
      html: '<p>This is a test email to verify Resend is working!</p>',
    });

    if (error) {
      console.error('❌ Resend Error:', error);
      return;
    }

    console.log('✅ Email sent successfully!');
    console.log('📧 Email ID:', data.id);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testResend();