import React from 'react'

import Box from 'grommet/components/Box'
import Heading from 'grommet/components/Heading'
import Form from 'grommet/components/Form'
import Header from 'grommet/components/Header'
import Footer from 'grommet/components/Footer'
import FormField from 'grommet/components/FormField'
import Button from 'grommet/components/Button'
import TextInput from 'grommet/components/TextInput'

import style from './styles/LoginForm.css'

const LoginForm = () => (
  <Box className={style.loginContainer}>
    <Form>
      <Header justify="center">
        <Heading tag="h2">Login</Heading>
      </Header>
      <FormField label="Email">
        <TextInput name="username" placeHolder="Masukkan email" />
      </FormField>
      <FormField label="Password">
        <TextInput type="password" name="Masukkan password" placeHolder="password" />
      </FormField>
      <Footer
        pad={{ vertical: 'medium' }}
        justify="end"
      >
        <Button
          fill={true}
          type="submit"
          primary={true}
          label="Login"
        />
      </Footer>
    </Form>
  </Box>
)

export default LoginForm
