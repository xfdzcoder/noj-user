const fileToArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event?.target?.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
const bufferToHex = (buffer: ArrayBufferLike) => {
  const byteArray = new Uint8Array(buffer);
  return byteArray.reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '');
}

export const sha256 = async (file: File) => {
  const arrayBuffer: BufferSource = await fileToArrayBuffer(file)
  // 使用SubtleCrypto计算SHA-256 hash
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  // 将ArrayBuffer转换为hex字符串
  return bufferToHex(hashBuffer);
}
