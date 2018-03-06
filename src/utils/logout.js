export default function logout(){
  localStorage.clear();
  window.store.dispatch(
    {
      type: 'USER_LOG_OUT'
    }
  )
}