import React, { useEffect, useContext, useState } from 'react';
import RecipeList from '../recipes/RecipeList';
import Hero from '../common/Hero';
import LoadingContainer from '../common/LoadingContainer';
import Tabs from '../elements/Tabs';
import Tab from '../elements/Tab';
import UserForm from '../user/UserForm';
import Spinner from '../common/Spinner';
import { getUserName, isLoggedInUser } from '../../utils/userUtils';
import { uploadImage } from '../../utils/firebaseUtils';
import userImagePlaceholder from '../../assets/user_placeholder.png';
import UserContext from '../../context/user/userContext';
import RecipeContext from '../../context/recipe/recipeContext';
import AuthContext from '../../context/auth/authContext';

const User = (props) => {
  const recipeContext = useContext(RecipeContext);
  const { recipes, getUserRecipes, loading } = recipeContext;

  const userContext = useContext(UserContext);
  const { user, getUser, updateUser } = userContext;

  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  const [activeTab, setActiveTab] = useState('my-recipes');
  const [profileImageLoading, setProfileImageLoading] = useState(false);

  useEffect(() => {
    loadUser();
    getUserRecipes(props.match.params.id);
    getUser(props.match.params.id);
    // eslint-disable-next-line
  }, []);

  const onUserUpdate = (userData) => {
    updateUser(userData);
  };

  const onProfileImageChange = (e) => {
    setProfileImageLoading(true);

    uploadImage(e.target.files[0], 'users', async (url, id) => {
      await updateUser({
        id: user._id,
        profileImage: id
      });

      setProfileImageLoading(false);
    });
  };

  if (loading) return <LoadingContainer message='Loading User' />;

  if (user === null) return false;
  const { firstName, lastName, username, profileImage } = user;

  let userImage = profileImage ? profileImage.imageUrl : userImagePlaceholder;

  return (
    <main>
      <Hero color='light'>
        <div className='hero-container with-image'>
          <div
            className='hero-image has-border square-image is-rounded has-background-grey-lighter'
            style={{ backgroundImage: `url(${userImage})` }}
          >
            {isLoggedInUser(authContext.user, user._id) &&
              (!profileImageLoading ? (
                <input
                  className='file-input-hidden'
                  type='file'
                  onChange={onProfileImageChange}
                />
              ) : (
                <Spinner size='medium' centered />
              ))}
          </div>
          <div>
            {(firstName || lastName) && (
              <p className='is-size-5 is-uppercase'>{username}</p>
            )}
            <h1 className='is-size-3 is-uppercase has-text-weight-light has-text-grey-darker'>
              {getUserName(firstName, lastName, username)}
            </h1>
            {/* <p>Recipe count: 0</p> */}
          </div>
        </div>
      </Hero>

      <div className='container is-fluid'>
        <Tabs>
          <Tab
            label='My Recipes'
            name='my-recipes'
            active={activeTab === 'my-recipes'}
            onClick={setActiveTab}
          />
          {isLoggedInUser(authContext.user, user._id) && (
            <Tab
              label='My Info'
              name='my-info'
              active={activeTab === 'my-info'}
              onClick={setActiveTab}
            />
          )}
        </Tabs>

        {activeTab === 'my-recipes' && (
          <RecipeList
            recipes={recipes}
            loading={loading}
            noRecipesMessage="User doesn't seem to have any public recipes"
          />
        )}

        {activeTab === 'my-info' && (
          <UserForm user={user} onFormSubmit={onUserUpdate} />
        )}
      </div>
    </main>
  );
};

export default User;
