import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import {
  CompanyDevice,
  CompanyLocal,
} from "../../contexts/Company/Company.interfaces";

import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

export const CustomDataGrid = (prop: {
  rows: CompanyLocal[] | CompanyDevice[];
  columns: GridColDef[];
}) => {
  const [selectedRow, setSelectedRow] = useState<GridRowSelectionModel>([]);

  const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
    if (newSelection.length === 1) {
      setSelectedRow(newSelection);
    } else {
      setSelectedRow([newSelection[newSelection.length - 1]]);
    }
  };

  return (
    <Box sx={{ height: 400, width: "100%", marginTop: "150px", padding: "0px 20px" }}>
      {selectedRow.length > 0 ? <Button>Teste</Button> : ""}
      <DataGrid
        rows={prop.rows}
        columns={prop.columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        rowSelectionModel={selectedRow}
        onRowSelectionModelChange={handleSelectionChange}
      />
    </Box>
  );
};
