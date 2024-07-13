import { useNavigate, useParams } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../redux/api";
import { WithThemeProviderLayout } from "../../layouts";

export function User() {
  const { data, isLoading, error } = useGetCurrentUserQuery();

  if (isLoading) return <>Loading...</>;

  if (!data || error) return <>No data</>;

  return (
    <WithThemeProviderLayout>
      <>
        <div>{data.id}</div>
        <div>{data.username}</div>
        <div>{data.email}</div>
      </>
    </WithThemeProviderLayout>
  );
}
