# Contact Form Setup with Resend

## 🚀 Complete Setup Guide

## 🚨 SECURITY NOTICE

**The previous API key `re_8vcX5TnR_3EKk1LYy8aJEQs9u7dvzKMkM` was exposed in the repository and must be rotated immediately.**

### Step 1: Rotate Your API Key
1. **Go to [resend.com](https://resend.com)**
2. **Navigate to "API Keys"**
3. **Delete the old key**: `re_8vcX5TnR_3EKk1LYy8aJEQs9u7dvzKMkM`
4. **Create a new API key**
5. **Copy the new key** (starts with `re_`)

### Step 2: Set Up Resend Account
1. **Go to [resend.com](https://resend.com)**
2. **Sign up** with your email
3. **Verify your account**

### Step 3: Add Domain to Resend
1. **In Resend dashboard**, click **"Domains"**
2. **Click "Add Domain"**
3. **Enter**: `mgbmediagroup.com`
4. **Click "Add"**

### Step 4: Configure DNS Records in GoDaddy
Resend will show you these DNS records to add:

**SPF Record:**
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all
```

**DKIM Record:**
```
Type: CNAME
Name: resend._domainkey
Value: resend._domainkey.resend.com
```

**DMARC Record (Optional but recommended):**
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:mgbmediagroup@gmail.com
```

### Step 5: Get API Key
1. **In Resend**, go to **"API Keys"**
2. **Click "Create API Key"**
3. **Name it**: "MGB Website Contact Form"
4. **Copy the API key** (starts with `re_`)

### Step 6: Configure Environment Variables

**In Netlify:**
1. **Go to your site dashboard**
2. **Click "Site settings" → "Environment variables"**
3. **Add new variable:**
   - **Key**: `RESEND_API_KEY`
   - **Value**: `your_NEW_api_key_here` (the rotated key from Step 1)

**For local development:**
1. **Copy `.env.example` to `.env.local`**
2. **Add your API key** to `.env.local`

### Step 7: Deploy and Test
1. **Push changes to GitHub** (already done)
2. **Netlify will auto-deploy**
3. **Test the contact form** on your live site

## ✅ What's Already Done

- ✅ **Contact form UI** - Beautiful, responsive design
- ✅ **API endpoint** - Netlify function at `/.netlify/functions/contact`
- ✅ **Email template** - Professional HTML email format
- ✅ **Error handling** - Proper validation and error messages
- ✅ **CORS setup** - Works with your domain
- ✅ **Form validation** - Client and server-side validation

## 📧 Email Configuration

**From Address**: `contact@mgbmediagroup.com`
**To Address**: `mgbmediagroup@gmail.com`
**Subject**: "New Contact Form Submission from [Name]"

## 🔧 Testing

Once set up, the form will:
1. **Validate** all required fields
2. **Send email** via Resend
3. **Show success message**
4. **Clear the form**

## 🚨 Troubleshooting

**If emails don't send:**
1. Check DNS records are properly configured
2. Verify API key is correct in Netlify environment variables
3. Check Netlify function logs for errors
4. Ensure domain is verified in Resend

**Common issues:**
- DNS propagation takes 24-48 hours
- API key must start with `re_`
- Domain must be verified in Resend before sending

## 🎯 Next Steps

1. **Complete Resend domain setup** (DNS records)
2. **Add API key to Netlify environment variables**
3. **Test the contact form**
4. **You're done!** 🎉