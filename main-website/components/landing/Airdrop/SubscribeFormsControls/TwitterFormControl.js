import {Field, Form, Formik} from "formik";

function validateUsername(value) {
    let error;
    if (!value) {
        error = 'Username is required'
    } else {

    }
}

export const TwitterFormControl = ({mb}) => {
    return <Formik
        initialValues={{ username: ""}}
        onSubmit={(values, actions) => {
            // setTimeout(() => {
            //     alert(JSON.stringify(values, null, 2))
            //     actions.setSubmitting(false)
            // }, 1000)
        }}
    >
        {(props) => (
            <Form>
                <Field username="username" validate={validateUsername}>

                </Field>
            </Form>
        )}
    </Formik>
    // <FormControl mb={mb}>
    //     <FormLabel mb="15px" fontSize="24px">Please subscribe our Twitter chanel and write your twitter username here.</FormLabel>
    //     <Stack direction="row" height="60px">
    //         <Input type="text" h="100%" fontSize="24px"/>
    //         <Button colorScheme="blue" width="150px" h="100%" fontSize="24px">Check</Button>
    //     </Stack>
    //
    // </FormControl>
    
}