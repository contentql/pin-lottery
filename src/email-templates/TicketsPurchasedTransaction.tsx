import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  render,
} from '@react-email/components'
import * as React from 'react'

import { Transaction, User } from '@/payload-types'

interface TicketsPurchasedProps {
  doc: Transaction
}
const imageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/images/client/2.png`
const env = process.env.NEXT_PUBLIC_SERVER_URL
export const TicketsPurchasedEmail = ({ doc }: TicketsPurchasedProps) => {
  console.log('tickets', doc)
  return (
    <Html>
      <Head />
      <Preview>Get your order summary</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={track.container}>
            <Row>
              <Column>
                <Text style={global.paragraphWithBold}>Transaction ID</Text>
                <Text style={track.number}>{doc?.id}</Text>
              </Column>
              <Column align='right'>
                <Link href={`${env}/user-transaction`} style={global.button}>
                  View Transaction
                </Link>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          <Section style={message}>
            <Img
              src={imageUrl}
              width='66'
              height='22'
              alt='Nike'
              style={{ margin: 'auto' }}
            />
            <Heading style={global.heading}>
              Your Lucky Break: Lottery Tickets Secured!.
            </Heading>
            <Text style={global.text}>
              Embrace anticipation! Your lottery tickets are secured, opening
              doors to boundless possibilities. Get ready to dream big!
            </Text>
            <Text style={{ ...global.text, marginTop: 24 }}>
              As you stand on the precipice of fate, imagine the myriad paths
              that lay before you, each one leading to a different destination
              of possibility. And why stop here? Add more tickets to amplify the
              chorus of your dreams, increasing your chances to win big.
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Text style={adressTitle}>
              User Name: {(doc.user?.value as User)?.user_name}
            </Text>
            <Text style={{ ...global.text, fontSize: 14 }}>
              Total Price : {doc?.amount}
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section
            style={{ ...paddingX, paddingTop: '40px', paddingBottom: '40px' }}>
            {doc?.tickets_transactions &&
              ((doc?.tickets_transactions as any)['0'] as Array<any>)?.map(
                (item, index) => (
                  <Row key={index}>
                    <Column>
                      <Img
                        src={item?.productImage}
                        alt="Brazil 2022/23 Stadium Away Women's Nike Dri-FIT Soccer Jersey"
                        style={{ float: 'left' }}
                        width='260px'
                      />
                    </Column>
                    <Column
                      style={{ verticalAlign: 'top', paddingLeft: '12px' }}>
                      <Text style={{ ...paragraph, fontWeight: '500' }}>
                        {item?.title}
                      </Text>
                      <Text style={global.text}>{item?.ticketPrice}</Text>
                      <Text style={global.text}>{item?.contestNumber}</Text>
                      <Text style={{ ...paragraph, fontWeight: '500' }}>
                        {item?.ticketNumber}
                      </Text>
                    </Column>
                    <Hr style={global.hr} />
                  </Row>
                ),
              )}
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Row style={{ display: 'inline-flex', marginBottom: 40 }}>
              <Column style={{ width: '170px' }}>
                <Text style={global.paragraphWithBold}>Order Number</Text>
                <Text style={track.number}>C0106373851</Text>
              </Column>
              <Column>
                <Text style={global.paragraphWithBold}>Order Date</Text>
                <Text style={track.number}>Sep 22, 2022</Text>
              </Column>
            </Row>
            <Row>
              <Column align='center'>
                <Link href={`${env}/user`} style={global.button}>
                  View Tickets
                </Link>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          <Hr style={global.hr} />
          <Section style={menu.container}>
            <Row>
              <Text style={menu.title}>Get Help</Text>
            </Row>
            <Row style={menu.content}>
              <Column style={{ width: '33%' }} colSpan={1}>
                <Link href={`${env}/contact`} style={menu.text}>
                  Contact Us
                </Link>
              </Column>
              <Column style={{ width: '33%' }} colSpan={1}>
                <Link href={`${env}/faqs`} style={menu.text}>
                  Faqs
                </Link>
              </Column>
            </Row>
            <Row style={{ ...menu.content, paddingTop: '0' }}>
              <Column style={{ width: '33%' }} colSpan={1}>
                <Link href={`${env}/about`} style={menu.text}>
                  About us
                </Link>
              </Column>
            </Row>
            <Hr style={global.hr} />
            <Row style={menu.tel}>
              <Column>
                <Row>
                  <Column style={{ width: '16px' }}>
                    <Img
                      src={imageUrl}
                      width='16px'
                      height='26px'
                      style={{ paddingRight: '14px' }}
                    />
                  </Column>
                  <Column>
                    <Text style={{ ...menu.text, marginBottom: '0' }}>
                      12-34-4-67-7878-34
                    </Text>
                  </Column>
                </Row>
              </Column>
              <Column>
                <Text
                  style={{
                    ...menu.text,
                    marginBottom: '0',
                  }}>
                  11 am - 11 pm PT
                </Text>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          <Section style={paddingY}>
            <Row>
              <Text style={global.heading}>Nike.com</Text>
            </Row>
            <Row style={categories.container}>
              <Column align='center'>
                <Link href={`${env}/contest`} style={categories.text}>
                  Contests
                </Link>
              </Column>
              <Column align='center'>
                <Link href={`${env}/winner`} style={categories.text}>
                  Winners
                </Link>
              </Column>
              <Column align='center'>
                <Link href={`${env}/blog`} style={categories.text}>
                  Blogs
                </Link>
              </Column>
              <Column align='center'>
                <Link href={`${env}/how-work`} style={categories.text}>
                  How to Use
                </Link>
              </Column>
            </Row>
          </Section>
          <Hr style={{ ...global.hr, marginTop: '12px' }} />
          <Section style={paddingY}>
            <Row style={footer.policy}>
              <Column>
                <Text style={footer.text}>Web Version</Text>
              </Column>
              <Column>
                <Text style={footer.text}>Privacy Policy</Text>
              </Column>
            </Row>
            <Row>
              <Text
                style={{ ...footer.text, paddingTop: 30, paddingBottom: 30 }}>
                Please contact us if you have any questions. (If you reply to
                this email, we wont be able to see it.)
              </Text>
            </Row>
            <Row>
              <Text style={footer.text}>
                © {new Date().getFullYear()} Lottery, Inc. All Rights Reserved.
              </Text>
            </Row>
            <Row>
              <Text style={footer.text}>
                Lottery. One Bowerman Drive, Beaverton, Oregon 97005, Nigeria.
              </Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default TicketsPurchasedEmail
export const TicketsPurchasedTransaction = (props: TicketsPurchasedProps) =>
  render(<TicketsPurchasedEmail {...props} />, { pretty: true })
const paddingX = {
  paddingLeft: '40px',
  paddingRight: '40px',
}

const paddingY = {
  paddingTop: '22px',
  paddingBottom: '22px',
}

const paragraph = {
  margin: '0',
  lineHeight: '2',
}

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  paragraphWithBold: { ...paragraph, fontWeight: 'bold' },
  heading: {
    fontSize: '32px',
    lineHeight: '1.3',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: '-1px',
  } as React.CSSProperties,
  text: {
    ...paragraph,
    color: '#747474',
    fontWeight: '500',
  },
  button: {
    border: '1px solid #929292',
    fontSize: '16px',
    textDecoration: 'none',
    padding: '10px 0px',
    width: '220px',
    display: 'block',
    textAlign: 'center',
    fontWeight: 500,
    color: '#000',
  } as React.CSSProperties,
  hr: {
    borderColor: '#E5E5E5',
    margin: '0',
  },
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '10px auto',
  width: '600px',
  maxWidth: '100%',
  border: '1px solid #E5E5E5',
}

const track = {
  container: {
    padding: '22px 40px',
    backgroundColor: '#F7F7F7',
  },
  number: {
    margin: '12px 0 0 0',
    fontWeight: 500,
    lineHeight: '1.4',
    color: '#6F6F6F',
  },
}

const message = {
  padding: '40px 74px',
  textAlign: 'center',
} as React.CSSProperties

const adressTitle = {
  ...paragraph,
  fontSize: '15px',
  fontWeight: 'bold',
}

const recomendationsText = {
  margin: '0',
  fontSize: '15px',
  lineHeight: '1',
  paddingLeft: '10px',
  paddingRight: '10px',
}

const recomendations = {
  container: {
    padding: '20px 0',
  },
  product: {
    verticalAlign: 'top',
    textAlign: 'left' as const,
    paddingLeft: '2px',
    paddingRight: '2px',
  },
  title: { ...recomendationsText, paddingTop: '12px', fontWeight: '500' },
  text: {
    ...recomendationsText,
    paddingTop: '4px',
    color: '#747474',
  },
}

const menu = {
  container: {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '20px',
    backgroundColor: '#F7F7F7',
  },
  content: {
    ...paddingY,
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  title: {
    paddingLeft: '20px',
    paddingRight: '20px',
    fontWeight: 'bold',
  },
  text: {
    fontSize: '13.5px',
    marginTop: 0,
    fontWeight: 500,
    color: '#000',
  },
  tel: {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '32px',
    paddingBottom: '22px',
  },
}

const categories = {
  container: {
    width: '370px',
    margin: 'auto',
    paddingTop: '12px',
  },
  text: {
    fontWeight: '500',
    color: '#000',
  },
}

const footer = {
  policy: {
    width: '166px',
    margin: 'auto',
  },
  text: {
    margin: '0',
    color: '#AFAFAF',
    fontSize: '13px',
    textAlign: 'center',
  } as React.CSSProperties,
}
