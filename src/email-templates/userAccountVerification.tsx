import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  render,
} from '@react-email/components'
import * as React from 'react'

interface UserEmailTemplateProps {
  actionLabel: string
  buttonText: string
  userName: string
  href: string
}

export const VerifyEmailTemplate = ({
  actionLabel,
  buttonText,
  userName,
  href,
}: UserEmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>{actionLabel}</Preview>
      <Body style={main}>
        <Container>
          <Section style={content}>
            <Row>
              <Img
                style={image}
                width={620}
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/client/2.png`}
              />
            </Row>

            <Row style={{ ...boxInfos, paddingBottom: '0' }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                ></Heading>
                <Heading
                  as='h3'
                  style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#FFF',
                  }}
                >
                  Welcome to our website! We are thrilled to have you join our
                  exciting community.
                </Heading>

                <Heading
                  as='h4'
                  style={{
                    color: '#FFF',
                    textAlign: 'center',
                    fontSize: 24,
                  }}
                >
                  Hi {userName}
                </Heading>

                <Text style={{ ...paragraph, textAlign: 'center' }}>
                  To get started on your journey with us, please take a moment
                  to verify your email address by clicking on the link below:
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: '0', alignItems: 'center' }}>
              <Column
                style={{ ...containerButton, textAlign: 'center' }}
                colSpan={2}
              >
                <Button style={button} href={href}>
                  {buttonText}
                </Button>
              </Column>
            </Row>
          </Section>

          <Section style={containerImageFooter}>
            <Img
              style={image}
              width={620}
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/client/2.png`}
            />
          </Section>

          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: '#FFF',
            }}
          >
            © 2022 | Yelp Inc., 350 Mission Street, San Francisco, CA 94105,
            U.S.A. | www.contentql.io
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const UserAccountVerification = (props: UserEmailTemplateProps) =>
  render(<VerifyEmailTemplate {...props} />, { pretty: true })

const main = {
  backgroundColor: '#0f0232',
  color: '#FFF',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
}

const paragraph = {
  color: '#FFF',
  fontSize: 16,
}

const logo = {
  padding: '30px 20px',
}

const containerButton = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
}

const button = {
  backgroundColor: '#e51275',
  borderRadius: 3,
  color: '#FFF',
  fontWeight: 'bold',
  border: '1px solid rgb(0,0,0, 0.1)',
  cursor: 'pointer',
  padding: '12px 30px',
}

const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
}

const image = {
  maxWidth: '100%',
}

const boxInfos = {
  padding: '20px',
}

const containerImageFooter = {
  padding: '45px 0 0 0',
}
