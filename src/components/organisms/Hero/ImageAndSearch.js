import React from 'react'

import Hero from 'grommet/components/Hero'
import Image from 'grommet/components/Image'
import Box from 'grommet/components/Box'
import Form from 'grommet/components/Form'
import FormField from 'grommet/components/FormField'
import TextInput from 'grommet/components/TextInput'
import DateTime from 'grommet/components/DateTime'
import Select from 'grommet/components/Select'
import Button from 'grommet/components/Button'

import Style from './styles/ImageAndSearch.css'

const ImageAndSearch = () => (
  <Hero
    className={Style.heroContainer}
    background={
      <Image
        src="/public/images/Hero1.jpg"
        fit="cover"
        full={true}
      />
    }
  >
    <Form plain={true}>
      <Box
        justify="center"
        direction="row"
        wrap={true}
        align="end"
        alignSelf="end"
        className={Style.formSearchContainer}
      >
        <Box wrap={true}>
          <FormField label="Tujuan">
            <TextInput placeHolder="Pilih tujuan Anda" />
          </FormField>
        </Box>
        <Box wrap={true}>
          <FormField label="Tanggal" >
            <DateTime
              id="date"
              name="date"
            />
          </FormField>
        </Box>
        <Box wrap={true}>
          <FormField label="Jumlah">
            <Select
              placeHolder="None"
              options={[
                {
                  value: 1,
                  label: '1 Orang',
                },
                {
                  value: 2,
                  label: '2 Orang',
                },
                {
                  value: 3,
                  label: '3 Orang',
                },
                {
                  value: 4,
                  label: '4 Orang',
                },
                {
                  value: 5,
                  label: '5 Orang',
                },
              ]}
              value={undefined}
            />
          </FormField>
        </Box>
        <Box
          wrap={true}
          className={Style.btnSubmitWrapper}
        >
          <FormField>
            <Button
              label="Search"
              primary={true}
              type="submit"
              onClick={(e) => {
                e.preventDefault()
                console.log('clicked')
              }}
            />
          </FormField>
        </Box>
      </Box>
    </Form>
  </Hero>
)

export default ImageAndSearch
