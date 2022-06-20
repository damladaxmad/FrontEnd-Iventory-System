// import React, { useEffect} from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setStudents } from "../redux/actions/studentsActions";


// export function useFetch(url){

//   const dispatch = useDispatch()

//    useEffect(()=>{
//       (
//          async function(){
//           const response = await axios
//           .get(url)
//           .catch((err) => {
//             console.log("Err: ", err);
//           });
//         dispatch(setStudents(response.data.data.students));
//          }
//       )()
//    },[url])

// }
 