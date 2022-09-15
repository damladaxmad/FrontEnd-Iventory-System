import { Button, Typography } from "@material-ui/core";
import myImage from "../assets/images/damladPic.jpg";
import { BsTelephone } from "react-icons/bs";
import { MdOutgoingMail } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import "./cv.css";
import { Box } from "@mui/system";


const CV = () => {
  const contacts = [
    {
      icon: <BsTelephone style={{ color: "white" }} />,
      value: "+252 616549198",
    },
    {
      icon: <MdOutgoingMail style={{ color: "white" }} />,
      value: "damladaxmad@gmail",
    },
  ];

  const skills = [
    { name: "Front-End Developer" },
    { name: "Web Designer" },
    { name: "SEO Expert" },
  ];

  const details = [
    {
      title: "About Me",
      content: "I am a front-end developer and creative web designer. I am a practicing real world designer. My designs and my development skills are highly admired."
    },
    {
        title: "Work Experience",
        content:
        "I have two years of design and development experience. I worked as a freelancer designing desktop apps and websites and developing them."
    },
   
  ];

  const lists = [
    {name: "My Skills", list: [
        "✔ I know the React library, HTML and CSS.",
        "✔ I am familiar with with Electron Js.",
        "✔ I am experienced with Figma.",
        "✔ I know a lot about SEO."
    ]},
    {name: "My Qualifications", list: [
        "✔ I have a degree in Information Technology.",
        "✔ I have a diploma in English Language.",
        "✔ I have taken design, SEO and dev courses."
    ]}
  ]

  return (
    <>
     
    <div

      style={{
        width: "65%",
        background: "#F9FAFF",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* The left div */}
      <div
        style={{
          width: "50%",
          background: "#F9FAFF",
          height: "600px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* Upper div */}

        <div
          style={{
            height: "150px",
            width: "170px",
            background: "#CAAB7C",
            borderBottom: "20px solid #F9FAFF",
            position: "absolute",
            left: "418px",
          }}
        ></div>
        {/* Contact and name div */}
        <div
          class="contact"
          style={{
            width: "72%",
            height: "500px",
            display: "flex",
            flexDirection: "column",
            background: "#131E33",
            borderRadius: "0px 0px 90px 0px",
            marginTop: "30%",
            padding: "20px",
            gap: "30px",
          }}
        >
          {/* Wrapper */}
          <div style={{ marginTop: "135px" }}>
            <div>
              <Typography component="div">
                <Box
                  sx={{ letterSpacing: 2, m: 0 }}
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: "18px",
                    lineSpacing: "28px",
                  }}
                >
                  Abdullah Sheikh
                </Box>
                <Box
                  sx={{ letterSpacing: 2, m: 0 }}
                  style={{
                    color: "lightGray",
                    fontWeight: "500",
                    fontSize: "15px",
                  }}
                >
                  Web Designer
                </Box>
              </Typography>
            </div>

            <div>
            <Typography component="div">
                <Box
                  sx={{ letterSpacing: 2, m: 0 }}
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: "15px",
                    lineSpacing: "28px",
                    marginTop:  "30px"
                  }}
                >
                  Contact Info
                </Box>
               
              </Typography>
              {contacts.map((contact) => (
                <div
                  style={{
                    display: "flex",
                    marginTop: "8px",
                    gap: "10px",
                    alignItems: "center",
                    fontSize: "15px",
                  }}
                >
                  {contact.icon}
                  <Typography component="div">
                <Box
                  sx={{ letterSpacing: 1, m: 0 }}
                  style={{
                    color: "white",
                    fontWeight: "500",
                    fontSize: "15px",
                    color: "lightGray",
                  }}
                >
                  {contact.value}
                </Box>
               
              </Typography>
                </div>
              ))}

<Typography component="div">
                <Box
                  sx={{ letterSpacing: 2, m: 0 }}
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: "15px",
                    lineSpacing: "28px",
                    marginTop:  "30px"
                  }}
                >
                  Work Skills
                </Box>
               
              </Typography>
              {skills.map((skill) => (
                <div
                  style={{
                    display: "flex",
                    marginTop: "8px",
                    gap: "10px",
                    alignItems: "center",
                    fontSize: "15px",
                  }}
                >
                  <BsCheckLg style={{ color: "white" }} />
                  <Typography component="div">
                <Box
                  sx={{ letterSpacing: 1, m: 0 }}
                  style={{
                    color: "white",
                    fontWeight: "500",
                    fontSize: "15px",
                    color: "lightGray",
                  }}
                >
                  {skill.name}
                </Box>
               
              </Typography>
                </div>
              ))}
            </div>
          </div>

          {/* The image */}
          <div
            style={{
              width: "200px",
              height: "200px",
              background: "grey",
              border: "5px solid white",
              position: "absolute",
              top: "130px",
              borderRadius: "90px 0px 90px 0px",
              zIndex: 30,
            }}
          >
            <img
              src={myImage}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "88px 0px 89px 0px",
              }}
            />
          </div>
        </div>
      </div>


      {/* The right div */}
      <div style={{ width: "48%", background: "#F9FAFF", height: "650px",
        padding: "15px" }}>

        {details.map(detail => (
            <div style = {{marginBottom: "20px"}}> 
                <Typography style={{color: "#C3A57B",
            fontWeight: "600", fontSize: "17px",
            marginBottom: "8px"}}> {detail.title}</Typography>
                <Typography style = {{fontSize: "15px"}}> {detail.content}</Typography>
            </div>

        ))}

        {lists.map(l => (
            <div style = {{marginBottom: "20px"}}> 
                <Typography style={{color: "#C3A57B",
            fontWeight: "600", fontSize: "16px",
            marginBottom: "8px"}}> {l.name}</Typography>
                <Typography style = {{fontWeight: "bold"}}> {l.list[0]}</Typography>
                <Typography> {l.list[1]}</Typography>
                <Typography> {l.list[2]}</Typography>
            </div>

        ))}
      </div>
    </div>
    </>
  );
};

export default CV;
