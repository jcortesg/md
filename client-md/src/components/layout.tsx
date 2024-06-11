import { Box, GlobalStyles } from "@mui/joy";
import { Fragment, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";

export function MainLayout(): JSX.Element {
  return (
    <Fragment>
      <GlobalStyles
        styles={{
          "#root": {
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gridTemplateRows: "auto 1fr",
            height: "100dvh",
          },
        }}
      />
      <Sidebar sx={{ gridArea: "1 / 1 / -1 / 2" }} />
      <Box sx={{ gridArea: "1 / 2 / -1 / -1", pt: "60px" }}>
        <Suspense>
          <Outlet />
        </Suspense>
      </Box>
    </Fragment>
  );
}