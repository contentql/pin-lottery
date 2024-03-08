  import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  render
} from '@react-email/components'

  interface UserContactEmailProps {
    userName: 'string'
    email: 'string'
    subject: 'string'
    message: 'string'
  }

  export const ContactEmail = ({
    userName,
    email,
    subject,
    message,
  }: UserContactEmailProps) => {
    const imageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/images/client/2.png`
    return (
      <Html>
        <Head />
        <Preview>Yelp recent login</Preview>
        <Body style={main}>
          <Container>
            <Section style={logo}>
              <Img src={imageUrl} />
            </Section>

            <Section style={content}>
              <Row style={{ ...boxInfos, paddingBottom: '0' }}>
                <Column>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Name: </b>
                    {userName}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Email: </b>
                    {email}
                  </Text>
                  <Text
                    style={{
                      color: 'rgb(0,0,0, 0.5)',
                      fontSize: 14,
                      marginTop: -5,
                    }}>
                    {subject}
                  </Text>

                  <Text style={paragraph}>{message}</Text>
                </Column>
              </Row>
              <Row style={{ ...boxInfos, paddingTop: '0' }}>
                <Column style={containerButton} colSpan={2}>
                  <Button style={button}>Learn More</Button>
                </Column>
              </Row>
            </Section>

            <Section style={containerImageFooter}>
              <Img style={image} width={620} src={imageUrl} />
            </Section>

          </Container>
        </Body>
      </Html>
    )
  }
  export const newContactForm = (props: UserContactEmailProps) =>
    render(<ContactEmail {...props} />, { pretty: true })

  const main = {
    backgroundColor: '#fff',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  }

  const paragraph = {
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
    backgroundColor: '#e00707',
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
