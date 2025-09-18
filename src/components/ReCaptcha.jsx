import React, { forwardRef, useImperativeHandle } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const ReCaptcha = forwardRef((props, ref) => {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const recaptchaRef = React.useRef();

  console.log('ReCaptcha v3 - Site Key:', siteKey ? `${siteKey.substring(0, 10)}...` : 'NO ENCONTRADA');

  useImperativeHandle(ref, () => ({
    executeAsync: async () => {
      if (!recaptchaRef.current) {
        throw new Error('reCAPTCHA no está listo');
      }
      return await recaptchaRef.current.executeAsync();
    },
    reset: () => {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    }
  }));

  if (!siteKey) {
    console.warn('reCAPTCHA Site Key no configurada');
    return null;
  }

  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      sitekey={siteKey}
      size="invisible"
    />
  );
});

ReCaptcha.displayName = 'ReCaptcha';

export default ReCaptcha;
