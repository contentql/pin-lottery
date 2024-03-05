import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  render,
} from '@react-email/components'
import * as React from 'react'

interface UserEmailTemplateProps {
  actionLabel: string
  buttonText: string
  href: string
}
const imageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/images/client/2.png`
export const ResetPasswordEmail = ({
  actionLabel,
  buttonText,
  href,
}: UserEmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>{actionLabel}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src={imageUrl} width='40' height='33' alt='Dropbox' />
          <Section>
            <Text style={text}>Hi </Text>
            <Text style={text}>
              Someone recently requested a password change for your Dropbox
              account. If this was you, you can set a new password here:
            </Text>
            <Button style={button} href={href}>
              {buttonText}
            </Button>
            <Text style={text}>
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
            <Text style={text}>
              To keep your account secure, please don&apos;t forward this email
              to anyone. See our Help Center for{' '}
              <Link style={anchor} href=''>
                more security tips.
              </Link>
            </Text>
            <Text style={text}>Happy betting!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const ResetPassword = (props: UserEmailTemplateProps) =>
  render(<ResetPasswordEmail {...props} />, { pretty: true })

const main = {
  padding: '10px 0',
  backgroundColor: '#0f0232',
  color: '#FFF',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
}

const container = {
  backgroundColor: '#0f0232',
  border: '1px solid #f0f0f0',
  padding: '45px',
}

const text = {
  fontSize: '16px',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
  fontWeight: '300',
  color: '#FFF',
  lineHeight: '26px',
}

const button = {
  backgroundColor: '#e51275',
  borderRadius: '4px',
  color: '#fff',
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: '15px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '210px',
  padding: '14px 7px',
}

const anchor = {
  textDecoration: 'underline',
}
