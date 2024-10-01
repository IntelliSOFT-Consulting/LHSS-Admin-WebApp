/**
 * Make sure there's a facilities.csv file in the utils folder before running this
 * Run this file using the node runtime
 * if you keep getting an unauthorized error - 401 visit 'https://kmhfr.health.go.ke/public/facilities' and inspect the Http requests and update the variable 'bearerToken'
 */



import axios from "axios";
import fs from "fs";
import path from "path"

const busiaFacilitiesUrl = "https://api.kmhfr.health.go.ke/api/facilities/facilities/?fields=id,code,name,regulatory_status_name,facility_type_name,owner_name,county,sub_county_name,constituency,ward_name,keph_level_name,operation_status_name&county=72366abd-2797-4144-8c74-c831810ec0a2&page=1"

const bearerToken = "2SG1oZeRsTrg9cGeDqNGqFYDAyQIBt"

export const fetchMOHFacilities = async ({page = 1}) => {
    try {
        const {data} = await axios(`${busiaFacilitiesUrl}&page=${page}`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        })
        return data
    } catch (e) {
        return e;
    }
}


const convertToCSV = (data) => {
    const headers = Object.keys(data[0]);

    const csvRows = [
        headers.join(","),
        ...data.map(facility => headers.map(header => facility[header]).join(","))
    ]

    return csvRows.join("\n")
}

const iterateFacilities =  async() =>{
    let totalPages = 2;
    const facilities = []

    for(let i = 1; i <= totalPages; i++) {
        const data = await fetchMOHFacilities({ page: i })
        totalPages= data.total_pages;
        facilities.push(...data.results)
    }

    const csvData = convertToCSV(facilities)
    const currentDir = process.cwd();
    const filePath = path.join(currentDir, "../assets", "facilities.csv");

    fs.writeFileSync(filePath, csvData, "utf8");

    return facilities

}



iterateFacilities()

