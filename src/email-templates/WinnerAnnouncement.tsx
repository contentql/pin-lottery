import { Contest, Ticket, User } from "@/payload-types";
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
    Row,
    Section,
    Text,
    render
} from "@react-email/components";
import * as React from "react";
  
  interface WinnerAnnouncementProps {
    doc:Ticket
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  
  export const WinnerAnnouncement = ({
    doc
  }: WinnerAnnouncementProps) => {
    const tips= [
              {
                id: 1,
                description:
                  'You may be required to verify your identity. This can involve providing identification details, such as mobile number.',
              },
              {
                id: 1,
                description:
'If the prize is a physical item, you need to come to provided address and claim your prize .'
              },
              {
                id: 1,
                description:
'Be mindful of any deadlines for claiming the prize. Many contests and giveaways have a time limit within which you must claim your prize. Missing this deadline could result in forfeiture of the prize.'              },
            ]
    const test=React.useState()
    const imageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/images/client/2.png`
    return (
    <Html>
      <Head />
      <Preview>Congratulation you won contest</Preview>
      <Body style={main}>
        <Container style={container}>
         
          <Section style={header}>
          <Img width={146} src={imageUrl} />
          </Section>
  
          <Section style={content}>
          <Row>
              <Img
                style={image}
                width={620}
                src={'https://cdn.templates.unlayer.com/assets/1621681063304-asa.png'}
              />
            </Row>
          
            <Section>
            
            </Section>
            <Heading as="h2" style={title}>
             Hi {(doc?.purchased_by?.value as User)?.user_name}
            </Heading>
            <Text style={paragraph}>
            Congratulations, you have won the {(doc?.contest_id?.value as Contest)?.product_type} in our. {(doc?.contest_id?.value as Contest)?.title} contest!
            </Text>
  
            <Hr style={divider} />
  
            <Heading as="h2" style={title}>
            To claim your prize, please follow these steps:
            </Heading>
            
            <ul>
              {tips.map((tip) => (
                <li key={tip.id}>
                  <Text style={paragraph}>{tip.description}</Text>
                </li>
              ))}
            </ul>
  
            <Text style={paragraph}>
              The more information please contact our <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/contact`}>
                Team
              </Link>
            </Text>
  
            <Hr style={divider} />
  
            <Heading as="h2" style={title}>
            Participate in contests to win substantial prizes.
            </Heading>
  
            <Section style={buttonContainer}>
              <Link style={button} href={`${process.env.NEXT_PUBLIC_SERVER_URL}/contest`}>
               Play Now
              </Link>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
    
  export const WinnerAnnouncementEmail = (props: WinnerAnnouncementProps) =>
    render(<WinnerAnnouncement {...props} />, { pretty: true })
  
  const main = {
    backgroundColor: "#f3f3f5",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  };
  
  const headerContent = { padding: "20px 30px 15px" };
  
  const headerContentTitle = {
    color: "#fff",
    fontSize: "27px",
    fontWeight: "bold",
    lineHeight: "27px",
  };
  
  const headerContentSubtitle = {
    color: "#fff",
    fontSize: "17px",
  };
  
  const headerImageContainer = {
    padding: "30px 10px",
  };
  
  const headerImage = {
    maxWidth: "100%",
  };
  
  const title = {
    margin: "0 0 15px",
    fontWeight: "bold",
    fontSize: "21px",
    lineHeight: "21px",
    color: "#0c0d0e",
  };
  
  const paragraph = {
    fontSize: "15px",
    lineHeight: "21px",
    color: "#3c3f44",
  };
  
  const divider = {
    margin: "30px 0",
  };
  
  const container = {
    width: "680px",
    maxWidth: "100%",
    margin: "0 auto",
    backgroundColor: "#ffffff",
   
  };
  
  const footer = {
    width: "680px",
    maxWidth: "100%",
    margin: "32px auto 0 auto",
    padding: "0 30px",
  };
  
  const content = {
    padding: "30px 30px 40px 30px",
  };
  
  const logo = {
    display: "flex",
    background: "#f3f3f5",
    padding: "20px 30px",
  };
  
  const header = {
    borderRadius: "5px 5px 0 0",
    display: "flex",
    justifyContent: "center",
    alingItems: "center",
    padding: 30,
    backgroundColor: "#2b2d6e",
  };
  
  const buttonContainer = {
    marginTop: "24px",
    display: "block",
  };
  const image = {
    maxWidth: "100%",
  };
  
  const button = {
    backgroundColor: "#0095ff",
    border: "1px solid #0077cc",
    fontSize: "17px",
    lineHeight: "17px",
    padding: "13px 17px",
    borderRadius: "4px",
    maxWidth: "120px",
    color: "#fff",
  };
  
const verifyText = {
    
    margin: 0,
    fontWeight: "bold",
    textAlign: "center" as const,
  };
  const footerDivider = {
    ...divider,
    borderColor: "#d6d8db",
  };
  
  const footerText = {
    fontSize: "12px",
    lineHeight: "15px",
    color: "#9199a1",
    margin: "0",
  };
  
  const footerLink = {
    display: "inline-block",
    color: "#9199a1",
    textDecoration: "underline",
    fontSize: "12px",
    marginRight: "10px",
    marginBottom: "0",
    marginTop: "8px",
  };
  
  const footerAddress = {
    margin: "4px 0",
    fontSize: "12px",
    lineHeight: "15px",
    color: "#9199a1",
  };
  const verificationSection = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const codeText = {
    fontWeight: "bold",
    fontSize: "36px",
    color:'green',
    margin: "10px 0",
    textAlign: "center" as const,
  };
  
  const footerHeart = {
    borderRadius: "1px",
    border: "1px solid #d6d9dc",
    padding: "4px 6px 3px 6px",
    fontSize: "11px",
    lineHeight: "11px",
    fontFamily: "Consolas,monospace",
    color: "#e06c77",
    maxWidth: "min-content",
    margin: "0 0 32px 0",
  };
  