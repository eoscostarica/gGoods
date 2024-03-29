const nodemailer = require('nodemailer')

const { mailConfig } = require('../config')

const sendVerificationCode = async (
  to,
  verficationCode,
  subject,
  title,
  message,
  buttonText
) => {
  const transporter = nodemailer.createTransport({
    host: mailConfig.host,
    secure: false,
    port: mailConfig.port,
    auth: {
      user: mailConfig.user,
      pass: mailConfig.pass
    },
    tls: { rejectUnauthorized: false }
  })

  const from = 'Ggoods <webmaster@ggoods.io>'

  await transporter.sendMail({
    from,
    to,
    subject,
    html: `
          <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>${title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style type="text/css">
            /**
             * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
             */
          @font-face {
                font-family: 'Source Sans Pro';
                font-style: normal;
                font-weight: 400;
                src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
              }
              @font-face {
                font-family: 'Source Sans Pro';
                font-style: normal;
                font-weight: 700;
                src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
              }
            }
            /**
             * Avoid browser level font resizing.
             * 1. Windows Mobile
             * 2. iOS / OSX
             */
            body,
            table,
            td,
            a {
              -ms-text-size-adjust: 100%; /* 1 */
              -webkit-text-size-adjust: 100%; /* 2 */
            }
            /**
             * Remove extra space added to tables and cells in Outlook.
             */
            table,
            td {
              mso-table-rspace: 0pt;
              mso-table-lspace: 0pt;
            }
            /**
             * Better fluid images in Internet Explorer.
             */
            img {
              -ms-interpolation-mode: bicubic;
            }
            /**
             * Remove blue links for iOS devices.
             */
            a[x-apple-data-detectors] {
              font-family: inherit !important;
              font-size: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
              color: inherit !important;
              text-decoration: none !important;
            }
            /**
             * Fix centering issues in Android 4.4.
             */
            div[style*="margin: 16px 0;"] {
              margin: 0 !important;
            }
            body {
              width: 100% !important;
              height: 100% !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            /**
             * Collapse table borders to avoid space between cells.
             */
            table {
              border-collapse: collapse !important;
            }
            a {
              color: #738EFF;
            }
            img {
              height: auto;
              line-height: 100%;
              text-decoration: none;
              border: 0;
              outline: none;
            }
            </style>
          </head>
          <body style="background-color: #f6f6f6;">
            <!-- start preheader -->
            <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
              ${subject}
            </div>
            <!-- end preheader -->
            <!-- start body -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%">​
              <!-- start logo -->
              <tr>
                <td align="center" bgcolor="#f6f6f6">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                      <td align="center" valign="top" style="padding: 36px 24px;">
                        <a href="" target="_blank" style="display: inline-block;">
                          <img src="https://ggoods.io/static/media/ggoods-logoVertical.062d0495.svg" alt="Logo" border="0" width="70%" style="display: block; width: 70% ">
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#f6f6f6">
              
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #f6f6f6;">
                        <h1 style="margin: 0; font-size: 32px; font-weight: bold; line-height: 48px; color: #4DD5EA;">${title}</h1>
                      </td>
                    </tr>
                    <tr>
                  </tr>
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                        <p style="margin: 0;">${message}</p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" bgcolor="#ffffff" 
                        style="padding: 24px; font-family: 'Source Sans Pro', 
                        Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                        <a href="https://ggoods.io/verification/${verficationCode}" target="_blank"
                          style="padding: 8px 12px; 
                          border: 1px solid #424242;border-radius: 5px;
                          font-family: Helvetica, Arial, sans-serif;font-size: 14px; 
                          color: #4DD5EA; text-decoration: none;
                          font-weight:bold;display: inline-block;">
                          ${buttonText}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify; border-bottom: 3px solid #4DD5EA">
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#f6f6f6" style="padding: 24px;">                
                </td>
              </tr>
            </table>
          </body>
    `
  })
}

const sendRegistrationRequest = async (to, organizationData) => {
  const transporter = nodemailer.createTransport({
    host: mailConfig.host,
    secure: false,
    port: mailConfig.port,
    auth: {
      user: mailConfig.user,
      pass: mailConfig.pass
    },
    tls: { rejectUnauthorized: false }
  })

  const from = 'Gggoods <webmaster@ggoods.io>'

  await transporter.sendMail({
    from,
    to,
    subject: 'Organization Registration Request',
    html: `
          <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>Registration Request</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style type="text/css">
            /**
             * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
             */
          @font-face {
                font-family: 'Source Sans Pro';
                font-style: normal;
                font-weight: 400;
                src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
              }
              @font-face {
                font-family: 'Source Sans Pro';
                font-style: normal;
                font-weight: 700;
                src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
              }
            }
            /**
             * Avoid browser level font resizing.
             * 1. Windows Mobile
             * 2. iOS / OSX
             */
            body,
            table,
            td,
            a {
              -ms-text-size-adjust: 100%; /* 1 */
              -webkit-text-size-adjust: 100%; /* 2 */
            }
            /**
             * Remove extra space added to tables and cells in Outlook.
             */
            table,
            td {
              mso-table-rspace: 0pt;
              mso-table-lspace: 0pt;
            }
            /**
             * Better fluid images in Internet Explorer.
             */
            img {
              -ms-interpolation-mode: bicubic;
            }
            /**
             * Remove blue links for iOS devices.
             */
            a[x-apple-data-detectors] {
              font-family: inherit !important;
              font-size: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
              color: inherit !important;
              text-decoration: none !important;
            }
            /**
             * Fix centering issues in Android 4.4.
             */
            div[style*="margin: 16px 0;"] {
              margin: 0 !important;
            }
            body {
              width: 100% !important;
              height: 100% !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            /**
             * Collapse table borders to avoid space between cells.
             */
            table {
              border-collapse: collapse !important;
            }
            a {
              color: #738EFF;
            }
            img {
              height: auto;
              line-height: 100%;
              text-decoration: none;
              border: 0;
              outline: none;
            }
            </style>
          </head>
          <body style="background-color: #f6f6f6;">
            <!-- start preheader -->
            <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
              Organization registration request.
            </div>
            <!-- end preheader -->
            <!-- start body -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%">​
              <!-- start logo -->
              <tr>
                <td align="center" bgcolor="#f6f6f6">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                      <td align="center" valign="top" style="padding: 36px 24px;">
                        <a href="" target="_blank" style="display: inline-block;">
                          <img src="https://ggoods.io/static/media/ggoods-logoVertical.062d0495.svg" alt="Logo" border="0" width="70%" style="display: block; width: 70% ">
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#f6f6f6">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600 px;">
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #f6f6f6;">
                        <h1 style="margin: 0; font-size: 32px; font-weight: bold; line-height: 48px; color: #4DD5EA;">Registration Request</h1>
                      </td>
                    </tr>
                    <tr>
                  </tr>
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                      <h4>Name</h4>
                      <p style="margin: 0;">${organizationData.name}</p>
                      <h4>Email</h4>
                      <p style="margin: 0;">${organizationData.email}</p>
                      <h4>Address</h4>
                      <p style="margin: 0;">${organizationData.address}</p>
                      <h4>Description</h4>
                      <p style="margin: 0;">${organizationData.description}</p>
                      <h4>Phone</h4>
                      <p style="margin: 0;">${organizationData.phone}</p>
                      <h4>Invitation code</h4>
                      <p style="margin: 0;">${organizationData.invitation_code}</p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" bgcolor="#ffffff" 
                        style="padding: 24px; font-family: 'Source Sans Pro', 
                        Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                        <a href="https://ggoods.io/register-organization/${organizationData.verification_code}" target="_blank"
                          style="padding: 8px 12px; 
                          border: 1px solid #424242;border-radius: 5px;
                          font-family: Helvetica, Arial, sans-serif;font-size: 14px; 
                          color: #4DD5EA; text-decoration: none;
                          font-weight:bold;display: inline-block;">
                          Approve
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify; border-bottom: 3px solid #4DD5EA">
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#f6f6f6" style="padding: 24px;">                
                </td>
              </tr>
            </table>
          </body>
    `
  })
}

const sendCredentialsRecovery = async (
  to,
  account,
  tempSecret,
  subject,
  title,
  message,
  accountText,
  password
) => {
  const transporter = nodemailer.createTransport({
    host: mailConfig.host,
    secure: false,
    port: mailConfig.port,
    auth: {
      user: mailConfig.user,
      pass: mailConfig.pass
    },
    tls: { rejectUnauthorized: false }
  })

  const from = 'Ggoods <webmaster@ggoods.io>'

  await transporter.sendMail({
    from,
    to,
    subject,
    html: `
          <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title${title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style type="text/css">
            /**
             * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
             */
          @font-face {
                font-family: 'Source Sans Pro';
                font-style: normal;
                font-weight: 400;
                src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
              }
              @font-face {
                font-family: 'Source Sans Pro';
                font-style: normal;
                font-weight: 700;
                src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
              }
            }
            /**
             * Avoid browser level font resizing.
             * 1. Windows Mobile
             * 2. iOS / OSX
             */
            body,
            table,
            td,
            a {
              -ms-text-size-adjust: 100%; /* 1 */
              -webkit-text-size-adjust: 100%; /* 2 */
            }
            /**
             * Remove extra space added to tables and cells in Outlook.
             */
            table,
            td {
              mso-table-rspace: 0pt;
              mso-table-lspace: 0pt;
            }
            /**
             * Better fluid images in Internet Explorer.
             */
            img {
              -ms-interpolation-mode: bicubic;
            }
            /**
             * Remove blue links for iOS devices.
             */
            a[x-apple-data-detectors] {
              font-family: inherit !important;
              font-size: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
              color: inherit !important;
              text-decoration: none !important;
            }
            /**
             * Fix centering issues in Android 4.4.
             */
            div[style*="margin: 16px 0;"] {
              margin: 0 !important;
            }
            body {
              width: 100% !important;
              height: 100% !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            /**
             * Collapse table borders to avoid space between cells.
             */
            table {
              border-collapse: collapse !important;
            }
            a {
              color: #738EFF;
            }
            img {
              height: auto;
              line-height: 100%;
              text-decoration: none;
              border: 0;
              outline: none;
            }
            </style>
          </head>
          <body style="background-color: #f6f6f6;">
            <!-- start preheader -->
            <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
              ${subject}
            </div>
            <!-- end preheader -->
            <!-- start body -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%">​
            <!-- start logo -->
              <tr>
                <td align="center" bgcolor="#f6f6f6">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                      <td align="center" valign="top" style="padding: 36px 24px;">
                        <a href="" target="_blank" style="display: inline-block;">
                          <img src="https://ggoods.io/static/media/ggoods-logoVertical.062d0495.svg" alt="Logo" border="0" width="70%" style="display: block; width: 70% ">
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#f6f6f6">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600 px;">
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #f6f6f6;">
                        <h1 style="margin: 0; font-size: 32px; font-weight: bold; line-height: 48px; color: #4DD5EA;"${title}</h1>
                      </td>
                    </tr>
                    <tr>
                  </tr>
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                      <p style="margin: 0;">${message}</p>
                      <h4>${accountText}</h4>
                      <p style="margin: 0;">${account}</p>
                      <h4>${password}</h4>
                      <p style="margin: 0;">${tempSecret}</p>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify; border-bottom: 3px solid #4DD5EA">
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#f6f6f6" style="padding: 24px;">                
                </td>
              </tr>
            </table>
          </body>
    `
  })
}

const sendConfirmMessage = async (to, subject, title, message) => {
  const transporter = nodemailer.createTransport({
    host: mailConfig.host,
    secure: false,
    port: mailConfig.port,
    auth: {
      user: mailConfig.user,
      pass: mailConfig.pass
    },
    tls: { rejectUnauthorized: false }
  })

  const from = 'Ggoods <webmaster@ggoods.io>'

  await transporter.sendMail({
    from,
    to,
    subject: subject,
    html: `
          <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>${title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style type="text/css">
            /**
             * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
             */
          @font-face {
                font-family: 'Source Sans Pro';
                font-style: normal;
                font-weight: 400;
                src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
              }
              @font-face {
                font-family: 'Source Sans Pro';
                font-style: normal;
                font-weight: 700;
                src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
              }
            }
            /**
             * Avoid browser level font resizing.
             * 1. Windows Mobile
             * 2. iOS / OSX
             */
            body,
            table,
            td,
            a {
              -ms-text-size-adjust: 100%; /* 1 */
              -webkit-text-size-adjust: 100%; /* 2 */
            }
            /**
             * Remove extra space added to tables and cells in Outlook.
             */
            table,
            td {
              mso-table-rspace: 0pt;
              mso-table-lspace: 0pt;
            }
            /**
             * Better fluid images in Internet Explorer.
             */
            img {
              -ms-interpolation-mode: bicubic;
            }
            /**
             * Remove blue links for iOS devices.
             */
            a[x-apple-data-detectors] {
              font-family: inherit !important;
              font-size: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
              color: inherit !important;
              text-decoration: none !important;
            }
            /**
             * Fix centering issues in Android 4.4.
             */
            div[style*="margin: 16px 0;"] {
              margin: 0 !important;
            }
            body {
              width: 100% !important;
              height: 100% !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            /**
             * Collapse table borders to avoid space between cells.
             */
            table {
              border-collapse: collapse !important;
            }
            a {
              color: #738EFF;
            }
            img {
              height: auto;
              line-height: 100%;
              text-decoration: none;
              border: 0;
              outline: none;
            }
            </style>
          </head>
          <body style="background-color: #f6f6f6;">
            <!-- start preheader -->
            <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
              ${subject}
            </div>
            <!-- end preheader -->
            <!-- start body -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%">​
              <!-- start logo -->
              <tr>
                <td align="center" bgcolor="#f6f6f6">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                      <td align="center" valign="top" style="padding: 36px 24px;">
                        <a href="" target="_blank" style="display: inline-block;">
                          <img src="https://ggoods.io/static/media/ggoods-logoVertical.062d0495.svg" alt="Logo" border="0" width="70%" style="display: block; width: 70% ">
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#f6f6f6">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600 px;">
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #f6f6f6;">
                        <h1 style="margin: 0; font-size: 32px; font-weight: bold; line-height: 48px; color: #4DD5EA;"> ${title}</h1>
                      </td>
                    </tr>
                    <tr>
                  </tr>
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                      <p style="margin: 0;">${message}</p>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify; border-bottom: 3px solid #4DD5EA">
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#f6f6f6" style="padding: 24px;">                
                </td>
              </tr>
            </table>
          </body>
    `
  })
}

module.exports = {
  sendCredentialsRecovery,
  sendVerificationCode,
  sendRegistrationRequest,
  sendConfirmMessage
}
