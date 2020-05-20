import { IRouteOptions } from "../interfaces/RouteOptions";
const routes: IRouteOptions[] = [
  {
    path: "/",
    name: "HomePage"
  },
  {
    path: "/modify/:noteId?",
    name: "ModifyNotePage",
    props: route => {
      const props = { ...route.params };
      props.noteId = +props.noteId;
      return props;
    }
  }
];

export default routes;
