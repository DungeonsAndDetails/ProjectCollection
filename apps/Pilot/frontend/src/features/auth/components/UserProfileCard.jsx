import { Badge, Button, Card } from '@projectcollection/component-lib';
import PropTypes from 'prop-types';

const UserProfileCard = ({ user, onSignOut }) => {
  return (
    <Card title="Signed in">
      <div className="flex items-center gap-4">
        {user.picture ? (
          <img
            src={user.picture}
            alt=""
            className="h-12 w-12 rounded-full"
            referrerPolicy="no-referrer"
          />
        ) : null}
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-slate-500">{user.email}</p>
        </div>
        <Badge variant={user.role === 'member' ? 'neutral' : 'success'}>{user.role}</Badge>
      </div>
      <div className="mt-4">
        <Button onClick={onSignOut}>Sign out</Button>
      </div>
    </Card>
  );
};

UserProfileCard.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfileCard;
