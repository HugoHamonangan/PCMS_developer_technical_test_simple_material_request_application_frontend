import UserList from './users/page';

interface Props {
  searchParams?: { search?: string };
}

export default async function Home() {
  return <UserList />;
}
