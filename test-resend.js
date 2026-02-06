// Simple test script to check Resend API
import { Resend } from 'resend';

// Using your actual API key
const resend = new Resend('re_8vcX5TnR_3EKk1LYy8aJEQs9u7dvzKMkM');

async function testResend() {
  try {
    console.log('Testing Resend API...');
    
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