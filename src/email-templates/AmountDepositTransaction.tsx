import { ticketsMetadata } from '../utils/tickets-metadata'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  render,
} from '@react-email/components'
import * as React from 'react'

import { Transaction } from '@/payload-types'

interface AmountDepositProps {
  doc: Transaction
}
const env = process.env.NEXT_PUBLIC_SERVER_URL

export default function DepositAmount({ doc }: AmountDepositProps) {
  const [empty, setEmpty] = React.useState()
  return (
    <Html>
      <Head />
      <Preview>Transaction Successful</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Img
                src={`${env}/images/client/2.png`}
                width='75'
                height='45'
                alt='Logo'
              />
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>
                Congratulations! Deposit Successful: Funds Added!
              </Heading>
              <Text style={mainText}>
                Your deposit has securely landed in your account, marking a
                successful transaction. Feel free to unwind and enjoy peace of
                mind knowing that your financial endeavor has been accomplished.
                This seamless process ensures your funds are readily available
                for your convenience. Now, take a moment to breathe easy and
                embrace the assurance of a completed transaction.
              </Text>
              <Section style={imageSectionSuccess}>
                <Img
                  src={`${env}/images/payment-success.png`}
                  width='75'
                  height='80'
                  alt='payment success'
                />
              </Section>
              <Section style={verificationSection}>
                <Text style={verifyText}>Deposited Amount</Text>

                <Text style={codeText}>
                  <span>{ticketsMetadata?.currency} </span> {doc?.amount}
                </Text>
                <Text style={validityText}>
                  (now you can purchase lottery tickets)
                </Text>
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                Amazon Web Services will never email you and ask you to disclose
                or verify your password, credit card, or banking account number.
              </Text>
            </Section>
          </Section>
          <Text style={footerText}>
            This message was produced and distributed by Lottery, Inc., 410
            Terry Ave. North, Seattle, WA 98109. © {new Date().getFullYear()}
            ,lottery, Inc.. please follow the{' '}
            <Link href={`${env}/blog`} target='_blank' style={link}>
              Our Blogs{' '}
            </Link>
            , Inc. View our{' '}
            <Link href={`${env}/faqs`} target='_blank' style={link}>
              FAQs{' '}
            </Link>
            if any questions.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const AmountDepositTransaction = (props: AmountDepositProps) =>
  render(<DepositAmount {...props} />, { pretty: true })

const main = {
  backgroundColor: '#fff',
  color: '#212121',
}

const container = {
  padding: '20px',
  margin: '0 auto',
  backgroundColor: '#eee',
}

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '15px',
}

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
}

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
}

const imageSection = {
  backgroundColor: '#252f3d',
  display: 'flex',
  padding: '20px 0',
  alignItems: 'center',
  justifyContent: 'center',
}
const imageSectionSuccess = {
  backgroundColor: 'transparent',
  display: 'flex',
  padding: '20px 0',
  alignItems: 'center',
  justifyContent: 'center',
}

const coverSection = { backgroundColor: '#fff' }

const upperSection = { padding: '25px 35px' }

const lowerSection = { padding: '25px 35px' }

const footerText = {
  ...text,
  fontSize: '12px',
  padding: '0 20px',
}

const verifyText = {
  ...text,
  margin: 0,
  fontWeight: 'bold',
  textAlign: 'center' as const,
}

const codeText = {
  ...text,
  fontWeight: 'bold',
  fontSize: '36px',
  color: 'green',
  margin: '10px 0',
  textAlign: 'center' as const,
}

const validityText = {
  ...text,
  margin: '0px',
  textAlign: 'center' as const,
}

const verificationSection = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const mainText = { ...text, marginBottom: '14px' }

const cautionText = { ...text, margin: '0px' }
