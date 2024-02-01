import { addInner} from "https://jscroot.github.io/element/croot.js";

export const URLGetUser =
  "https://asia-southeast2-marjuniati-putri.cloudfunctions.net/wasenderauto-users";

  export const tableUser = `
  <tr>
      <td>
          <div class="d-flex flex-column">
              <span class="fw-medium">#NAMA#</span>
              <small class="text-muted">#EMAIL#</small>
          </div>
      </td>
      <td>#USERNAME#</td>
      <td>#PHONE#</td>
      <td><span class="badge bg-label-secondary #BGSTATUS# me-1">#LICENSE#</span></td>
      <td>
          <button onclick="PostApprove('#APPROVE#')" class="btn btn-primary" #DISABLED#>Approve</button>
      </td>
  </tr>
  `;
  

export function responseData(results) {
  console.log(results);
  results.data.forEach(isiRow);
}

export function isiRow(value) {
    let licenseValue = value.license;
    let licenseText = licenseValue === "kosong" ? "Tidak Berlisensi" : "Berlisensi";
    let bgStatus = licenseValue === "kosong" ? "bg-label-danger" : "bg-label-success";
    let disableButton = licenseValue !== "kosong" ? "disabled" : "";

    const user = tableUser
      .replace("#NAMA#", value.name)
      .replace("#EMAIL#", value.email)
      .replace("#USERNAME#", value.username)
      .replace("#PHONE#", value.phone_number)
      .replace("#LICENSE#", licenseText)
      .replace("#BGSTATUS#", bgStatus)
      .replace("#APPROVE#", value.username)
      .replace("#DISABLED#", disableButton);
    addInner("data_user", user);
}




