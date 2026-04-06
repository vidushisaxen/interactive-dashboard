import { Sector } from "recharts";

const ActiveShape = ({
  cx = 0,
  cy = 0,
  innerRadius = 0,
  outerRadius = 0,
  startAngle = 0,
  endAngle = 0,
  fill = "var(--primary)",
  payload,
}) => {
  return (
    <g>
      {/* Active slice */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        // style={{
        //   filter: "drop-shadow(0 0 8px color-mix(in srgb, var(--primary) 35%, transparent))",
        // }}
      />

      {/* Outer highlight ring */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 14}
        outerRadius={outerRadius + 20}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.5}
      />
    </g>
  );
};

export default ActiveShape;
