import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import Chart from "react-apexcharts";

import { Sidebar } from "../../components/Sidebar";

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axsisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      new Date("2022-03-23T00:00:00.000Z").toLocaleString("pt-BR", {
        day: "2-digit",
        month: "short",
      }),
      new Date("2022-03-24T00:00:00.000Z").toLocaleString("pt-BR", {
        day: "2-digit",
        month: "short",
      }),
      new Date("2022-03-25T00:00:00.000Z").toLocaleString("pt-BR", {
        day: "2-digit",
        month: "short",
      }),
      new Date("2022-03-26T00:00:00.000Z").toLocaleString("pt-BR", {
        day: "2-digit",
        month: "short",
      }),
      new Date("2022-03-27T00:00:00.000Z").toLocaleString("pt-BR", {
        day: "2-digit",
        month: "short",
      }),
      new Date("2022-03-28T00:00:00.000Z").toLocaleString("pt-BR", {
        day: "2-digit",
        month: "short",
      }),
      new Date("2022-03-29T00:00:00.000Z").toLocaleString("pt-BR", {
        day: "2-digit",
        month: "short",
      }),
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
} as const;

const series = [{ name: "series1", data: [21, 120, 10, 28, 61, 18, 109] }];
export function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid
          width={["100%", "100%", "100%", "80%"]}
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            <Text as="span" fontSize="lg" mb="4">
              Usuários Cadastrados
            </Text>
            <Chart type="area" height={160} options={options} series={series} />
          </Box>

          <Box p={["6", "8"]} bg="gray.800" borderRadius={8}>
            <Text as="span" fontSize="lg" mb="4">
              Usuários Deletados
              <Chart
                type="area"
                height={160}
                options={options}
                series={series}
              />
            </Text>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
