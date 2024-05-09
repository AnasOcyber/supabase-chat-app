interface Props {
  activeUsersCount: number;
}

const ActiveUsers = ({ activeUsersCount }: Props) => {
  return (
    <div className="mb-3 text-green-600">{activeUsersCount} active users</div>
  );
};

export default ActiveUsers;
