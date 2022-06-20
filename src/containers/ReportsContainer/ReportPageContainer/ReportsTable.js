import MaterialTable from "material-table";

const ReportsTable = () => {

    const materialOptions = {
        showTitle: false,
        exportButton: true,
        sorting: false,
        showTextRowsSelected: false,
        toolbar: false,
        paging: false,
        pageSizeOptions: [2, 5, 8, 10, 20, 25, 50, 100],
        pageSize: 4,
        draggable: false,
        actionsColumnIndex: -1,
        rowStyle: {border: "none"},
        headerStyle: { background: "#EFF0F6", fontSize: "13px", },
       
      }

      const columns = [
   
        { title: "Employee Name", field: "name", width: "4%",
        cellStyle: { border: "none"} },
        { title: "Username", field: "username", cellStyle: { border: "none"} },
        { title: "User Password", field: "password", cellStyle: { border: "none"} },
        { title: "City", field: "city", cellStyle: { border: "none"} },
        { title: "Phone", field: "phone", cellStyle: { border: "none"} },
      ];

      const data = [
        {name: "Caaqil Ali Ahmed", username: "caaqil323",
        password: "caaqil2022", city: "Mogadishu", phone: "0616539082"},
        {name: "Caaqil Ali Ahmed",city: "Mogadishu", phone: "0616539082", username: "caaqil323", password: "caaqil2022"},
        {name: "Caaqil Ali Ahmed",city: "Mogadishu", phone: "0616539082", username: "caaqil323", password: "caaqil2022"},
        {name: "Caaqil Ali Ahmed",city: "Mogadishu", phone: "0616539082", username: "caaqil323", password: "caaqil2022"},
        {name: "Caaqil Ali Ahmed",city: "Mogadishu", phone: "0616539082", username: "caaqil323", password: "caaqil2022"},
        {name: "Caaqil Ali Ahmed",city: "Mogadishu", phone: "0616539082", username: "caaqil323", password: "caaqil2022"},
        {name: "Caaqil Ali Ahmed",city: "Mogadishu", phone: "0616539082", username: "caaqil323", password: "caaqil2022"},
        
      ]

    return (
        <MaterialTable
        columns={columns}
        data={data}
        options={materialOptions}
        style={{ borderRadius: "10px", boxShadow: "none",
        width: "100%", marginTop: "30px", background: "#F7F7F7" }}
      />

    )

}

export default ReportsTable