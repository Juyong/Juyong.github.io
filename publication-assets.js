(() => {
  const files = `
SDF-Avatar.gif
SplatCtrlA.gif
LaGen.png
FGO-SLAM.gif
SparseLGS.png
SDFRaster.gif
DFL_render.gif
progressiveAvatar.gif
DualReg.png
easy3e.gif
ExpPortrait.gif
SwapForm4D.gif
physical_caustic.jpg
learn2control.gif
SPARE.gif
osot.gif
pica.gif
EGAvatar.png
MacroReconstruction.png
NeuralShadowArt.png
LightControl.png
D3Human.gif
HERA.jpg
RGAvatar.jpg
ScalableReconstruction.gif
Oblique-MERF.jpg
PortraitGen.gif
iShapeEditing.jpg
DeformableNeRF.gif
City-on-Web.gif
DynoSurf.png
L0-Sampler.png
FlashAvatar.png
Neural-ABC.png
IntrinsicNGP.jpg
FR-NonRigid-PAMI.jpg
Flattening-Net-PAMI.png
RegGeoNet-IJCV.jpg
SketchPQ.png
NDR.png
nerfblendshape.gif
SelfRecon.gif
HeadNeRF.gif
NeuralPoints.jpg
NonRigidSurvey.png
FRICP.jpg
ExpressionTransfer.jpg
GE-TVCG.jpg
GDR-Net.jpg
Face-IDR.jpg
AD-NeRF.jpg
Robust_Rigistration.jpg
1D-Flow.jpg
FaceFromX.jpg
RMA-Registration.jpg
StereoPiFU.jpg
CaricatureLandmark.jpg
PerspectiveCorrection.jpg
HandRepresentation.jpg
Geodesic.jpg
LSA-Conv.png
RGBD-Recognition.jpg
Caricature-MM.jpg
BCNet.jpg
BodyRepresentation.jpg
FaceCollection.jpg
AA-DR.jpg
RNRR.jpg
FacePSNet.jpg
AANet.jpg
Vehicle_DoF.jpg
ADMM-AA.jpg
PoseEstimation.jpg
RDN.jpg
FLBC.jpg
FaceRepresentation.jpg
SDFilter.jpg
3DFaceNet.jpg
FaceEyeVR.png
AAOptimization.jpg
face-Reconstruction.jpg
Caricature.jpg
Shading-Reconstruction.jpg
HeadPose.jpg
FaceParsing.jpg
FrameFab.jpg
Hand.jpg
FeatureLearning.jpg
upright.png
alignment.png
GuidanceConstruction.png
circle.png
TVMeshDenoising.jpg
ReconDiction.jpg
LBC.jpg
L1-Subdivission.png
RobustInput_Segmentation.jpg
ToolPath_Small.png
CVPR2014_ID1132_XuDi.jpg
LocalMod.png
tog12-title.jpg
TIP-1.jpg
ALM_Surface.png
ALM-Restoration.png
TVCG_CRW.png
ALM_multichannel.jpg
CVPR_10.png
MeshSnapping.jpg
TCSVT_progressive.png
AA-KMeans.jpg
FaceAlignment.jpg`.trim().split("\n");

  const heights = [120,150,150,180,80,110,110,140,155,150,85,150,153,150,188,225,125,125,110,209,130,171,110,120,150,167,167,167,130,140,135,135,110,110,150,150,70,90,128,172,150,140,200,140,144,150,152,182,125,152,110,90,128,146,144,176,87,125,138,240,109,138,136,138,170,132,142,241,173,127,138,180,141,95,179,225,193,140,146,167,166,150,168,135,158,173,115,226,150,135,132,96,117,172,123,183,190.5,177.4,191.7,187.5,108,167.7,222.5,128,228.3,140,119,212.5,117,143,125];
  const fallbacks = {
    13: ""
  };

  window.PUBLICATION_ASSETS = {};
  window.PUBLICATION_ASSETS[0] = {
    image: "assets/publications/Voxel-Depth.jpg",
    ratio: "250 / 160",
    originalFile: "Voxel-Depth.jpg"
  };
  files.forEach((file, index) => {
    const id = index + 1;
    window.PUBLICATION_ASSETS[id] = {
      image: Object.prototype.hasOwnProperty.call(fallbacks, id) ? fallbacks[id] : `assets/publications/${file}`,
      ratio: `250 / ${heights[index]}`,
      originalFile: file
    };
  });

  const publications = window.SITE_DATA?.publications;
  if (publications && !publications.some((pub) => pub.title === "Voxel Grid-Based Depth Recovery from Monocular Structured Light")) {
    publications.unshift({
      id: 0,
      title: "Voxel Grid-Based Depth Recovery from Monocular Structured Light",
      authors: "Zhuohang Yu, Kai Wang, Juyong Zhang",
      venue: "IEEE Transactions on Visualization and Computer Graphics (TVCG), 2026.",
      year: 2026,
      image: "assets/publications/Voxel-Depth.jpg",
      links: []
    });
  }
  const fgoSlam = publications?.find((pub) => pub.id === 4);
  if (fgoSlam) fgoSlam.title = "FGO-SLAM++: Real-time Geometry-Aware Gaussian SLAM with Continuous Opacity Field";
})();
