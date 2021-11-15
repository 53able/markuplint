/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type AttributeType =
	| (
			| 'String'
			| 'NonEmptyString'
			| 'Boolean'
			| 'Function'
			| 'Date'
			| 'Int'
			| 'Uint'
			| 'Float'
			| 'NonZeroUint'
			| 'ZeroToOne'
			| 'AcceptList'
			| 'AutoComplete'
			| 'BCP47'
			| 'Color'
			| 'ColSpan'
			| 'Coords'
			| 'Crossorigin'
			| 'DateTime'
			| 'Destination'
			| 'DOMID'
			| 'DOMIDList'
			| 'IRI'
			| 'ItemType'
			| 'LinkSizes'
			| 'LinkType'
			| 'LinkTypeList'
			| 'MediaQuery'
			| 'MediaQueryList'
			| 'MIMEType'
			| 'ReferrerPolicy'
			| 'RowSpan'
			| 'SourceSizeList'
			| 'SrcSet'
			| 'TabIndex'
			| 'Target'
			| 'URL'
			| 'URLHash'
			| 'URLList'
			| 'CSSAngle'
			| 'CSSBlendMode'
			| 'CSSClipPath'
			| 'CSSCustomIdent'
			| 'CSSDisplay'
			| 'CSSFilter'
			| 'CSSFontFamily'
			| 'CSSFontSize'
			| 'CSSFontVariant'
			| 'CSSFontWeight'
			| 'CSSMask'
			| 'CSSOpacity'
			| 'CSSTextDecoration'
			| 'CSSTransformList'
			| 'CSSTransformOrigin'
			| 'CSSURL'
			| 'SVGAnimatableValue'
			| 'SVGBeginValueList'
			| 'SVGClockValue'
			| 'SVGColorMatrix'
			| 'SVGDashArray'
			| 'SVGEndValueList'
			| 'SVGFilterPrimitiveReference'
			| 'SVGKernelMatrix'
			| 'SVGKeyPoints'
			| 'SVGKeySplines'
			| 'SVGKeyTimes'
			| 'SVGLanguageTags'
			| 'SVGLength'
			| 'SVGLengthList'
			| 'SVGNumberList'
			| 'SVGNumberOptionalNumber'
			| 'SVGOrigin'
			| 'SVGPaint'
			| 'SVGPathCommands'
			| 'SVGPercentage'
			| 'SVGPercentageList'
			| 'SVGPoints'
			| 'SVGPreserveAspectRatio'
			| 'SVGViewBox'
	  )
	| {
			enum: string[];
	  };
export type AttributeCondition =
	| {
			ancestor: string;
	  }
	| {
			self: string | string[];
	  };

export interface AttributesSchema {
	tag: string;
	attributes: (
		| (
				| '#globalAttrs'
				| '#ariaAttrs'
				| '#SVGAnimationAdditionAttrs'
				| '#SVGAnimationAttributeTargetAttrs'
				| '#SVGAnimationEventAttrs'
				| '#SVGAnimationTargetElementAttrs'
				| '#SVGAnimationTimingAttrs'
				| '#SVGAnimationValueAttrs'
				| '#SVGConditionalProcessingAttrs'
				| '#SVGCoreAttrs'
				| '#SVGDocumentElementEventAttrs'
				| '#SVGDocumentEventAttrs'
				| '#SVGFilterPrimitiveAttrs'
				| '#SVGGlobalEventAttrs'
				| '#SVGGraphicalEventAttrs'
				| '#SVGPresentationAttrs'
				| '#SVGTransferFunctionAttrs'
				| '#XLinkAttrs'
		  )
		| AttributeJSON
		| DefineDefaultAttributeType
	)[];
}
export interface AttributeJSON {
	name: string;
	type: AttributeType | [AttributeType, ...AttributeType[]];
	defaultValue?: string;
	deprecated?: boolean;
	required?: boolean | AttributeCondition;
	requiredEither?: string[];
	noUse?: boolean;
	condition?: AttributeCondition;
}
export interface DefineDefaultAttributeType {
	name: string;
	defaultValue: string;
}