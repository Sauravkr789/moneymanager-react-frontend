export const validateEmail=(email)=>{
  if(email.trim())
  {
    // const regex = /^\S+@\S+\.\S+$/;
    const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;;
    return regex.test(email);
  }
  return false;
}