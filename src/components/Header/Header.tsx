import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#0B5C2D",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar>
        <Box
          component="img"
          src="/early.png"
          alt="Early App Logo"
          sx={{
            height: 32,
            width: "auto",
            mr: 2,
          }}
        />

        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          Early
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
