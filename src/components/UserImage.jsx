import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`https://socio-app-backend.onrender.com/assets/${image}`} // TODO might be dependent on server port
      />
    </Box>
  );
};

export default UserImage;
