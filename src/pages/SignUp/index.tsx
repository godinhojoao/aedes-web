import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Copyright } from "../../core/components/Copyright";
import { FormStepper } from "../../core/components/FormStepper";
import { FormStep } from "./FormStep";

const defaultTheme = createTheme();

export function SignUpPage(): JSX.Element {
  // const { isValid, data } = useForm();
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<Inputs>({resolver: yupResolver()});
  // const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
          }}
          justifyContent="center"
          alignItems="center"
        >
          <FormStepper
            stepElements={[
              <FormStep key={uuidv4()} isPersonalStep={true} />,
              <FormStep key={uuidv4()} isPersonalStep={false} />,
            ]}
            stepLabels={["Informações pessoais", "Credenciais de autenticação"]}
          />
        </Box>

        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
