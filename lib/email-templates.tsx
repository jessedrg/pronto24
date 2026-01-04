interface PartnerEmailProps {
  name: string
  company: string
  phone: string
  email: string
  service: string
}

export function createPartnerNotificationEmail({ name, company, phone, email, service }: PartnerEmailProps): string {
  const serviceNames: Record<string, string> = {
    fontanero: "Fontanero",
    electricista: "Electricista",
    cerrajero: "Cerrajero",
    desatascos: "Desatascos",
    calderas: "Calderas",
  }

  const serviceName = serviceNames[service] || service

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #000000; padding: 24px; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                🔧 RapidFix
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="background-color: #ffffff; padding: 40px; border-left: 1px solid #e5e5e5; border-right: 1px solid #e5e5e5;">
              
              <!-- Alert Badge -->
              <div style="background-color: #FF4D00; color: #ffffff; padding: 8px 16px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: bold; margin-bottom: 24px;">
                NUEVO PARTNER REGISTRADO
              </div>

              <h2 style="margin: 0 0 24px 0; color: #000000; font-size: 28px; font-weight: 600;">
                ${name} quiere unirse
              </h2>

              <p style="margin: 0 0 32px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                Un nuevo profesional se ha registrado en la plataforma y está interesado en recibir leads.
              </p>

              <!-- Info Card -->
              <table width="100%" style="background-color: #f9f9f9; border-radius: 8px; margin-bottom: 32px;">
                <tr>
                  <td style="padding: 24px;">
                    <table width="100%">
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                          <span style="color: #999999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Nombre</span>
                          <p style="margin: 4px 0 0 0; color: #000000; font-size: 16px; font-weight: 600;">${name}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                          <span style="color: #999999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Empresa</span>
                          <p style="margin: 4px 0 0 0; color: #000000; font-size: 16px; font-weight: 600;">${company || "No especificada"}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                          <span style="color: #999999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Teléfono</span>
                          <p style="margin: 4px 0 0 0; color: #000000; font-size: 16px; font-weight: 600;">
                            <a href="tel:${phone}" style="color: #000000; text-decoration: none;">${phone}</a>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                          <span style="color: #999999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</span>
                          <p style="margin: 4px 0 0 0; color: #000000; font-size: 16px; font-weight: 600;">
                            <a href="mailto:${email}" style="color: #000000; text-decoration: none;">${email}</a>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0;">
                          <span style="color: #999999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Servicio</span>
                          <p style="margin: 4px 0 0 0; color: #FF4D00; font-size: 18px; font-weight: bold;">${serviceName}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Buttons -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-right: 8px;" width="50%">
                    <a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}" style="display: block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 14px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; text-align: center;">
                      WhatsApp
                    </a>
                  </td>
                  <td align="center" style="padding-left: 8px;" width="50%">
                    <a href="tel:${phone}" style="display: block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 14px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; text-align: center;">
                      Llamar
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #000000; padding: 24px; border-radius: 0 0 12px 12px; text-align: center;">
              <p style="margin: 0; color: #666666; font-size: 12px;">
                RapidFix Partners · Barcelona
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}
