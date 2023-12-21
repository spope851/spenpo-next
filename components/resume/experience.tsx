import { Accordion, Box, ListItem, Typography } from "@mui/material"
import React from "react"
import AccordionDetails from "./accordionDetails"
import List from "./list"
import LinkSummary from "./linkSummary"

const Experience: React.FC = () => {
  return (
    <>
      <Accordion>
        <LinkSummary
          title="Technical Lead - Web Team"
          href="https://blockchains.com"
          linkTitle="Blockchains Inc"
          subTitle="2022 - 2023"
        />
        <AccordionDetails>
          <List>
            <ListItem>
              <Typography>
                Articulate technical requirements to developers based on the
                intentions of product managers
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Engage in long term planning with time horizons varying from two
                weeks to several quarters
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Own the agile process and facilitate all scrum ceremonies
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Own the frontend technology stack and make architectural decisions
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Communicate the goals and progress of the team at all levels of the
                organization
              </Typography>
            </ListItem>
            <Typography
              component={Box}
              sx={{
                justifyContent: "space-between",
                display: "flex",
                my: 3,
              }}
            >
              <Box component="span" sx={{ fontWeight: "bold" }}>
                Web Engineer
              </Box>
              <Box
                component="span"
                sx={(theme) => ({
                  [theme.breakpoints.down("md")]: { display: "none" },
                })}
              >
                2021 - 2022
              </Box>
            </Typography>
            <ListItem>
              <Typography>
                Integrate backend services with web applications, often developing in
                parallel with backend teams
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Build appropriately flexible UI components from Figma designs
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Manage global application state and local state at the feature level
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Bootstraped new portal app using Next.js</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Architected responsive layout using Material UI
              </Typography>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <LinkSummary
          title="Lead Frontend Engineer"
          href="https://legendarylabs.net"
          linkTitle="Legendary Labs (failed) startup"
          subTitle="2021 - 2022"
        />
        <AccordionDetails>
          <List>
            <ListItem>
              <Typography>
                Bootstraped frontend react app and company website
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Integrated GraphQL/Solidity stack with frontend web app
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Orchestrated dev and staging environments with AWS EC2
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Deployed to production and set up CI pipeline with Cloudflare
              </Typography>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <LinkSummary
          title="UI Engineer"
          href="https://definitivehc.com"
          linkTitle="Definitive Healthcare"
          subTitle="2019 - 2021"
        />
        <AccordionDetails>
          <List>
            <ListItem>
              <Typography>
                Built healthcare intelligence features with React and SQL Server and
                integrated with .NET web app
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Wrote dynamic SQL stored procedures to leverage data in the frontend
                via Node.js web API
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Built universal UI components and published to the company&apos;s
                shared component library
              </Typography>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <LinkSummary
          title="Product Management Intern"
          href="https://sovos.com"
          linkTitle="Sovos Compliance, LLC"
          subTitle="Summer 2018"
        />
        <AccordionDetails>
          <List>
            <ListItem>
              <Typography>
                Exercised Agile and Scrum methodologies for multiple enterprise
                products
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Reviewed Epics and wrote user stories with entrance/acceptance
                criteria in JIRA
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Participated in daily stand-ups, weekly sprint plannings, and backlog
                refinements
              </Typography>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <LinkSummary
          title="Quality Assurance Engineer"
          href="https://instant-tech.com"
          linkTitle="Instant Technologies"
          subTitle="2017 - 2018"
        />
        <AccordionDetails>
          <List>
            <ListItem>
              <Typography>
                Performed user testing of virtual help desk instant messaging
                services
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Designed landing pages to optimize search results for specific
                keywords{" "}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Analyzed and reported metrics using Google AdWords and Google
                Analytics
              </Typography>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default Experience
