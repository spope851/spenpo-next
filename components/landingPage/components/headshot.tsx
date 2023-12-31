import { Box } from '@mui/material'
import React, { useContext } from 'react'
import { LandingPageContext } from '@/context/landingPage'
import { useDropzone } from 'react-dropzone'
import UploadIcon from '@mui/icons-material/Upload'
import { ShoppingCartContext } from '@/context/shoppingCart'

export const Headshot: React.FC = () => {
  const { HEADSHOT_SRC, SECONDARY_ACCENT_COLOR, cms, editable } =
    useContext(LandingPageContext)

  const BOX_PROPS = {
    height: { md: 480, xs: 'unset' },
    width: { md: 480, xs: '100%' },
    borderRadius: 1,
    sx: {
      backgroundImage: `url(${HEADSHOT_SRC || '/images/headshot.jpeg'})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
    flex: { xs: 1 },
    minHeight: 200,
  }

  const {
    file: [, setFile],
  } = useContext(ShoppingCartContext)

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDropAccepted: (acceptedFiles: Array<File>) => {
      const reader = new FileReader()
      reader.onabort = () =>
        /* eslint-disable no-console */ console.log('file reading was aborted')
      reader.onerror = () =>
        /* eslint-disable no-console */ console.log('file reading has failed')
      reader.readAsArrayBuffer(acceptedFiles[0])
      reader.onload = async () => {
        setFile(acceptedFiles[0])
        cms?.headshotSrc.setter(URL.createObjectURL(acceptedFiles[0]))
      }
    },
  })

  return editable && editable[0] ? (
    <>
      <input {...getInputProps()} />
      <Box
        {...getRootProps()}
        {...BOX_PROPS}
        // m="2px"
        sx={{
          ':hover': {
            cursor: 'pointer',
            outline: `dashed ${SECONDARY_ACCENT_COLOR} 2px`,
            m: 0,
          },
          opacity: 0.6,
          ...BOX_PROPS.sx,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <UploadIcon
          sx={{
            fontSize: 50,
            position: 'absolute',
          }}
        />
      </Box>
    </>
  ) : (
    <Box {...BOX_PROPS} />
  )
}
