import { NextPageWithLayout } from 'pages/_app'
import Layout from 'components/Layout.component'
import RegisterComponent from 'components/Register.component'
import { useFetchUser } from 'api/authContext'
const Register: NextPageWithLayout = () => {
  return (
    <RegisterComponent />
  )
}
Register.getLayout = (page) => {
  const { user, loading } = useFetchUser()
  return (
    <Layout user={user} title="register">{page}</Layout>
  )
}
export default Register