export let URLKARYAWAN = "https://hris_backend.ulbi.ac.id/api/v2/master/all";
export let URLHONORMENGAJARPRODI = "https://hris_backend.ulbi.ac.id/honor/dosen/prodi";
export let URLREKAPHONOR = "https://hris_backend.ulbi.ac.id/honor/dosen/csv"
export let URLSLIPHONOR = "https://hris_backend.ulbi.ac.id/honor/dosen/sliphonor"
export let URLMAKSIMALMENGAJAR = "https://hris_backend.ulbi.ac.id/honor/dosen/dikjar"
export let URLEVELJABATAN = "https://hris_backend.ulbi.ac.id/honor/dosen/level"
export let URLJAFUNG = "https://hris_backend.ulbi.ac.id/honor/dosen/jafung"
export let URLDOSEN = "https://hris_backend.ulbi.ac.id/honor/dosen/data"
export let URLGajiKelompok = "https://hris_backend.ulbi.ac.id/api/v2/wage/kelompok"
export let URLEXPORTGAJI = "https://hris_backend.ulbi.ac.id/api/v2/wage/csv"
export let URLSLIPGAJI = "https://hris_backend.ulbi.ac.id/api/v2/wage/slip"
export let URLValidate = "https://hris_backend.ulbi.ac.id/api/v2/rkp/raw/"

export let templatesdm = `
<td class="py-5 px-6 font-medium max-w-xs">#nama#</td>
<td class="font-medium  max-w-xs">#email#</td>
<td class="font-medium text-center max-w-xs">#notelp#</td>
<td class="font-medium text-center max-w-xs">#kelompok#</td>
<td class="font-medium text-center max-w-xs">
<a href="formsdm.html">
<button type="click" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Detail</button>
</a>
</td>
`

export let templatehonorprodi = `
<td class="flex items-center py-5 px-6 font-medium">
  <p>#nama#</p>
</td>
<td class="font-medium">#jabatan#</td>
<td class="font-medium">#honorkotor</td>
<td>
  <span class="inline-block py-1 px-2 text-white bg-green-500 rounded-full">#potongan#</span>
</td>
<td>#honorbersih#</td>
`

export let templatedikjar = `
<td class="py-5 px-6 font-medium">#jenisjabatan#</td>
<td class="font-medium">#namajabatan#</td>
<td class="font-medium">#maksimal#</td>
<td class="font-medium">#status#</td>
`

export let templatelevel = `
<td class="py-5 px-6 font-medium">#kodejbt#</td>
<td class="font-medium">#namajabatan#</td>
<td class="font-medium">#honor#</td>
`

export let templatedosen = `
<td class="py-5 px-6 font-medium">#nama#</td>
<td class="font-medium">#email#</td>
<td class="font-medium">#kodejp#</td>
<td class="font-medium">#nip#</td>
<td class="font-medium">#nidn#</td>
`

export let templategaji = `                        
<td class="py-5 px-6 font-medium">#nama#</td>
<td class="font-medium">#GajiKotor#</td>
<td class="font-medium">#TotalPotongan#</td>
<td class="font-medium">#dibayarkan#</td>
<td class="hidden">
  <span class="inline-block py-1 px-2 text-white bg-green-500 rounded-full">Completed</span>
</td>`


export let templateValidasidata = `                        
<td class="py-5 px-6 font-medium">#nama#</td>
<td class="py-5 px-6 font-medium">#email#</td>
<td class="font-medium">#GajiKotor#</td>
<td class="font-medium">#TotalPotongan#</td>
<td class="font-medium">#pph#</td>
<td class="font-medium">#dibayarkan#</td>
<td>
  <button class="inline-block py-1 px-2 text-white bg-green-500 rounded-full edit" id="detail" data-email="#cihuy#" type="button">Detail</button>
</td>`

export let modaltemp = `        
        <h5 class="card-title">Berhasil Membuat Slip Gaji</h5>
`
export let tabletag = "tr"
export let tableRowClass = "text-xs bg-gray-50"