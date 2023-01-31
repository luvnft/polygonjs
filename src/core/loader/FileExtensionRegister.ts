import {NodeContext} from '../../engine/poly/NodeContext';
import {AudioType} from '../../engine/poly/registers/nodes/types/Audio';
import {CopType, CopTypeImage} from '../../engine/poly/registers/nodes/types/Cop';
import {SopType, SopTypeFile, SopTypeFileMulti} from '../../engine/poly/registers/nodes/types/Sop';
import {
	GeometryExtension,
	AUDIO_EXTENSIONS,
	ImageExtension,
	SDF_EXTENSIONS,
	VIDEO_EXTENSIONS,
	FontExtension,
} from '../FileTypeController';
export const EXTENSIONS_BY_NODE_TYPE_BY_CONTEXT: Record<NodeContext, Record<string, string[]>> = {
	[NodeContext.ACTOR]: {},
	[NodeContext.ANIM]: {},
	[NodeContext.AUDIO]: {
		[AudioType.FILE]: [...AUDIO_EXTENSIONS],
	},
	[NodeContext.COP]: {
		[CopType.CUBE_MAP]: [ImageExtension.PNG, ImageExtension.JPEG, ImageExtension.JPG, ImageExtension.WEBP],
		[CopType.GIF]: [ImageExtension.GIF],
		[CopTypeImage.IMAGE]: [ImageExtension.PNG, ImageExtension.JPEG, ImageExtension.JPG, ImageExtension.WEBP],
		[CopTypeImage.IMAGE_EXR]: [ImageExtension.EXR],
		[CopTypeImage.IMAGE_HDR]: [ImageExtension.HDR],
		[CopTypeImage.IMAGE_KTX2]: [ImageExtension.KTX2],
		[CopType.LUT]: [ImageExtension.PNG],
		[CopType.SDF_FROM_URL]: [...SDF_EXTENSIONS],
		[CopType.VIDEO]: [...VIDEO_EXTENSIONS],
	},
	[NodeContext.CSG]: {},
	[NodeContext.EVENT]: {},
	[NodeContext.GL]: {},
	[NodeContext.JS]: {},
	[NodeContext.MANAGER]: {},
	[NodeContext.MAT]: {},
	[NodeContext.OBJ]: {},
	[NodeContext.POST]: {},
	[NodeContext.ROP]: {},
	[NodeContext.SOP]: {
		[SopType.DATA_URL]: [GeometryExtension.JSON],
		[SopTypeFile.FILE_GLTF]: [GeometryExtension.GLB, GeometryExtension.GLTF],
		[SopTypeFile.FILE_DRC]: [GeometryExtension.DRC],
		[SopTypeFile.FILE_FBX]: [GeometryExtension.FBX],
		[SopTypeFile.FILE_JSON]: [GeometryExtension.JSON],
		[SopTypeFile.FILE_MPD]: [GeometryExtension.MPD],
		[SopTypeFileMulti.FILE_GLTF]: [GeometryExtension.GLTF, GeometryExtension.GLB],
		[SopTypeFileMulti.FILE_OBJ]: [GeometryExtension.OBJ],
		[SopTypeFile.FILE_OBJ]: [GeometryExtension.OBJ],
		[SopTypeFile.FILE_PDB]: [GeometryExtension.PDB],
		[SopTypeFile.FILE_PLY]: [GeometryExtension.PLY],
		[SopTypeFile.FILE_STL]: [GeometryExtension.STL],
		[SopTypeFile.FILE_SVG]: [GeometryExtension.SVG],
		[SopType.TEXT]: [FontExtension.TTF, FontExtension.JSON],
	},
};
