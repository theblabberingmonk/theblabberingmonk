
-- Update auth configuration to set OTP expiry to 30 minutes (1800 seconds)
UPDATE auth.config 
SET 
  mailer_otp_exp = 1800,
  mailer_secure_email_change_enabled = true
WHERE instance_id = '00000000-0000-0000-0000-000000000000';

-- Create custom email templates for better branding
INSERT INTO auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at)
VALUES (gen_random_uuid(), null, null, null, null, 'email', null, null, now(), now(), 'otp', now())
ON CONFLICT DO NOTHING;
