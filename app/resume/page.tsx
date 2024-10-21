import {
  Accordion,
  AccordionSummary,
  Typography,
  Box,
  ListItem,
  Stack,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React from 'react'
import { Experience } from './components/Experience'
import { LinkSummary } from './components/LinkSummary'
import { AccordionDetails } from './components/AccordionDetails'
import { List } from './components/List'
import Link from 'next/link'

export default async function Resume() {
  return (
    <Stack
      sx={{
        color: 'text.primary',
      }}
      mx="auto"
      p={{ xs: 2, sm: 5 }}
      gap={5}
      maxWidth={{ md: '50em' }}
    >
      <Typography component="h1" display="flex" alignItems="baseline" gap={5}>
        Resume
        <Typography>
          <Link
            href="https://www.pope.love/pub/spencer_pope_resume.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: 'auto' }}
          >
            Download Resume
          </Link>
        </Typography>
      </Typography>
      <Stack borderTop="solid 2px #999" pt={3} gap={3}>
        <Typography variant="h6" textAlign="center">
          Spencer Pope - Web Developer & Software Engineer
        </Typography>
        <Box>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Skills</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  Languages:
                </Box>
                TypeScript, JavaScript, HTML, CSS, Python, SQL
              </Typography>
              <Typography>
                <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  Software/Frameworks:
                </Box>
                React.js, Next.js, Node.js, Svelte.js, PostgreSQL, SQL Server,
                MongoDB, .Net, Docker, AWS
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
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
                <ListItem
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography>Built this site from scratch</Typography>
                  <Typography display={{ xs: 'none', sm: 'block' }}>2022</Typography>
                </ListItem>
                <ListItem
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography>First-degree black belt in karate</Typography>
                  <Typography display={{ xs: 'none', sm: 'block' }}>2011</Typography>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Certifications</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    component={Link}
                    href="https://aws.amazon.com/certification/certified-cloud-practitioner/"
                  >
                    AWS Certified Cloud Practitioner
                  </Typography>
                  <Typography
                    component={Link}
                    href="https://www.credly.com/badges/8e90c447-ebb4-4916-bf0e-3137783cf300/linked_in_profile"
                  >
                    2024
                  </Typography>
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
      </Stack>
    </Stack>
  )
}
