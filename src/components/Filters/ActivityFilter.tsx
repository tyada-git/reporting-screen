import {
  Autocomplete,
  Box,
  Button,
  Paper,
  TextField,
  type PaperProps,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { VirtualizedListbox } from "./VirtualizedListbox";

interface ActivityFilterProps {
  allActivities: string[];
  selectedActivities: string[];
  onChange: (selected: string[]) => void;
}

const ActivityFilter = ({
  allActivities,
  selectedActivities,
  onChange,
}: ActivityFilterProps) => {
  const CustomPaper = (props: PaperProps) => {
    const { children, ...other } = props;
    const handleSelectAll = () => {
      onChange(allActivities);
    };

    return (
      <Paper {...other} elevation={8}>
        <Box
          sx={{
            p: 1,
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            gap: 1,
            bgcolor: "background.paper",
          }}
        >
          <Button
            size="small"
            variant={
              selectedActivities.length === allActivities.length
                ? "contained"
                : "outlined"
            }
            onClick={handleSelectAll}
            onMouseDown={(e) => e.preventDefault()}
            sx={{ borderRadius: "16px", textTransform: "none", minWidth: 60 }}
          >
            All
          </Button>
        </Box>

        {children}
      </Paper>
    );
  };
  return (
    <Autocomplete
      multiple
      id="activity-multiple"
      options={allActivities}
      value={selectedActivities}
      onChange={(event, value) => onChange(value)}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        const SelectionIcon = selected
          ? CheckBoxIcon
          : CheckBoxOutlineBlankIcon;

        return (
          <li
            key={key}
            {...optionProps}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "8px 12px",
            }}
          >
            <span>{option}</span>

            <SelectionIcon
              fontSize="small"
              sx={{
                flexShrink: 0,
                color: selected ? "#0B5C2D" : "rgba(0,0,0,0.35)",
              }}
            />
          </li>
        );
      }}
      style={{ width: 300 }}
      renderValue={(selected) => {
        if (selected.length === 0) return null;

        if (selected.length === allActivities.length) {
          return "All";
        }

        return `${selected.length} Activities`;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Activities"
          placeholder="search activities"
          sx={{
            "& .MuiInputLabel-root": {
              fontWeight: 800,
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              transition: "all 0.2s ease",
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              boxShadow: "0 0 0 4px rgb(180, 255, 127)",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#0B5C2D",
              },
          }}
        />
      )}
      slots={{
        paper: CustomPaper,
        listbox: VirtualizedListbox,
      }}
    />
  );
};
export default ActivityFilter;
