import {CopRegister} from './Cop';
import {EventRegister} from './Event';
import {GlRegister} from './Gl';
import {MatRegister} from './Mat';
import {ObjRegister} from './Obj';
import {PostRegister} from './Post';
import {SopRegister} from './Sop';

import {Poly} from '../../../Poly';

export class AllNodesRegister {
	static async run(poly: Poly) {
		// const {CopRegister} = await import(/* webpackChunkName: "Cop" */ './Cop');
		CopRegister.run(poly);

		// const {EventRegister} = await import(/* webpackChunkName: "Event" */ './Event');
		EventRegister.run(poly);

		// const {GlRegister} = await import(/* webpackChunkName: "Gl" */ './Gl');
		GlRegister.run(poly);

		// const {MatRegister} = await import(/* webpackChunkName: "Mat" */ './Mat');
		MatRegister.run(poly);

		// const {ObjRegister} = await import(/* webpackChunkName: "Obj" */ './Obj');
		ObjRegister.run(poly);

		PostRegister.run(poly);

		// const {SopRegister} = await import(/* webpackChunkName: "Sop" */ './Sop');
		SopRegister.run(poly);
	}
}