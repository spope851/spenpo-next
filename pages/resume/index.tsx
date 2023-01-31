import {
  Accordion,
  AccordionSummary,
  Typography,
  Box,
  ListItem,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import React, { useState } from "react"
import Experience from "@/components/resume/experience"
import LinkSummary from "@/components/resume/linkSummary"
import AccordionDetails from "@/components/resume/accordionDetails"
import List from "@/components/resume/list"
import Head from "next/head"

export default function Resume() {
  const [epxerienceExp, setExperienceExp] = useState(true)

  return (
    <>
      <Head>
        <title>spencer pope</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
          color: "text.primary",
          borderRadius: 1,
          p: 3,
        }}
        mx={{ lg: "20%", md: "10%" }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            m: "0px 0px 24px",
          }}
        >
          Spencer Pope: Professional Web Developer and Software Engineer
        </Typography>
        <Box>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Skills</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
                  Languages:
                </Box>
                TypeScript, JavaScript, HTML, CSS, Python, SQL
              </Typography>
              <Typography>
                <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
                  Software/Frameworks:
                </Box>
                React.js, Next.js, Node.js, Svelte.js, PostgreSQL, SQL Server,
                MongoDB, .Net, Docker, AWS
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={epxerienceExp}
            onChange={() => setExperienceExp(!epxerienceExp)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Experience</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Experience />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Achievements</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem>
                  <Typography>Built this site from scratch</Typography>
                </ListItem>
                <ListItem>
                  <Typography>First-degree black belt in karate</Typography>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Formal Education</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Accordion>
                <LinkSummary
                  title="BS, Business Admin"
                  linkTitle="University of New Hampshire"
                  href="https://unh.edu"
                  subTitle="2015 - 2019"
                />
                <AccordionDetails>
                  <List>
                    <ListItem>
                      <Typography>
                        Studied Information Technology as a minor with the College of
                        Engineering and Physical Sciences
                      </Typography>
                    </ListItem>
                    <ListItem sx={{ ml: 5 }}>
                      <Typography>
                        Courses on web development, DBMS, coding in Python, internet
                        protocols, and computer architecture
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography>
                        Studied Information Systems & Business Analytics with the
                        Peter T. Paul School of Business and Economics
                      </Typography>
                    </ListItem>
                    <ListItem sx={{ ml: 5 }}>
                      <Typography>
                        Courses on the roles technology play in modern businesses
                      </Typography>
                    </ListItem>
                    <ListItem sx={{ ml: 5 }}>
                      <Typography>
                        Served executive roles for Information Systems Management
                        Association student org
                      </Typography>
                    </ListItem>
                    <ListItem sx={{ ml: 5 }}>
                      <Typography>
                        Worked as teachers&apos; assistant for Management Information
                        Systems course
                      </Typography>
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <LinkSummary
                  linkTitle="Beijing Language and Culture University"
                  href="http://english.blcu.edu.cn/"
                  subTitle="January 2019"
                />
                <AccordionDetails>
                  <List>
                    <ListItem>
                      <Typography>
                        Studied Mandarin 20 hours per week with the College of
                        Intensive Chinese Language Studies
                      </Typography>
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </>
  )
}
