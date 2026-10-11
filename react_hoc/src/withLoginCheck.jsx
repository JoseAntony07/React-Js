// HOC: takes a component as an argument and returns a new component
function withLoginCheck(Component) {
  // This is the new, enhanced component returned by the HOC
  return function ProtectedPage(props) {
    // In a real app, this value would come from your authentication system
    const isLoggedIn = true;

    // If the user is not logged in, show a message instead of the page
    if (!isLoggedIn) {
      return <p>Please log in to view this page.</p>;
    }

    // If logged in, render the original component and pass its props through
    return <Component {...props} />;
  };
}

// Export the HOC so other files can use it
export default withLoginCheck;
