import { Autocomplete, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

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
          <li key={key} {...optionProps}>
            <SelectionIcon />
            {option}
          </li>
        );
      }}
      style={{ width: 400 }}
      renderInput={(params) => (
        <TextField {...params} label="Checkboxes" placeholder="Favorites" />
      )}
    />
  );
};
export default ActivityFilter;
