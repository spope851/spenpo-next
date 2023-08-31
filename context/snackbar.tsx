import { IconButton, Snackbar } from "@mui/material"
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react"
import CloseIcon from "@mui/icons-material/Close"
import { createContext } from "react"

interface SnackbarContextProps {
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>
  setSnackbarMessage: Dispatch<SetStateAction<string | undefined>>
  setSnackbarAction: Dispatch<SetStateAction<ReactNode>>
}

export const SnackbarContext = createContext<SnackbarContextProps>(
  {} as SnackbarContextProps
)

export const SnackbarContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setSnackbarOpen] = useState(false)
  const [message, setSnackbarMessage] = useState<string>()

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    setSnackbarOpen(false)
  }
  const [action, setSnackbarAction] = useState<ReactNode>(
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  )

  return (
    <SnackbarContext.Provider
      value={{ setSnackbarMessage, setSnackbarOpen, setSnackbarAction }}
    >
      {children}
      <Snackbar
        open={open}
        ContentProps={{ sx: { color: "#000", bgcolor: "#ddd" } }}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </SnackbarContext.Provider>
  )
}
