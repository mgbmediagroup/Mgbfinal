// Simple test script to check Resend API
const { Resend } = require('resend');

// You'll need to replace this with your actual API key
const resend = new Resend('your_api_key_here');

async function testResend() {
  try {
    console.log('Testing Resend API...');
    
    // Test API key validity
    const { data, error } = await resend.emails.send({
      from: 'test@mgbmediagroup.com',
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