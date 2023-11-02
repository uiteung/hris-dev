export let URLKARYAWAN = "https://hris_backend.ulbi.ac.id/peg/rtm/data";
export let URLHONORMENGAJARPRODI = "https://hris_backend.ulbi.ac.id/honor/dosen/prodi";

export let templatesdm = `
<td class="py-5 px-6 font-medium max-w-xs">#nama#</td>
<td class="font-medium  max-w-xs">#email#</td>
<td class="font-medium text-center max-w-xs">#notelp#</td>
<td class="font-medium text-center max-w-xs">#kelompok#</td>
<td class="font-medium text-center max-w-xs">#jabatan#</td>
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
export let tabletag = "tr"
export let tableRowClass = "text-xs bg-gray-50"