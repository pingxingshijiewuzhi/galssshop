<template>
	<view>
		<!-- 单个复选框 -->
		<checkbox-group class="block" @change="checkboxChange">
			<view class="cu-form-group">
				<view class="title">复选选操作(checkbox)</view>
				<checkbox :class="isChecked?'checked':''" :checked="isChecked?true:false" value="1"></checkbox>
			</view>
		</checkbox-group>

		<!-- 多个复选框，带全选 -->
		<view>
			<checkbox-group class="block" @change="changeCheckbox">
				<view v-for="item in checkboxData" :key="item.value">
					<checkbox :value="String(item.value)" :checked="checkedArr.includes(String(item.value))" :class="{'checked':checkedArr.includes(String(item.value))}"></checkbox>
					<text>{{item.label}}</text>
				</view>
			</checkbox-group>
		</view>
		<view>
			<checkbox-group @change="allChoose">
				<label>
					<checkbox value="all" :class="{'checked':allChecked}" :checked="allChecked?true:false"></checkbox> 全选
				</label>
			</checkbox-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isChecked: false,
				checkboxData: [{
						'value': 0,
						'label': '选项一'
					},
					{
						'value': 1,
						'label': '选项二'
					},
					{
						'value': 2,
						'label': '选项三'
					},
					{
						'value': 3,
						'label': '选项四'
					},
					{
						'value': 4,
						'label': '选项五'
					},
					{
						'value': 5,
						'label': '选项六'
					},
					{
						'value': 6,
						'label': '选项七'
					},
					{
						'value': 7,
						'label': '选项八'
					},
					{
						'value': 8,
						'label': '选项九'
					},
					{
						'value': 9,
						'label': '选项十'
					}
				],
				checkedArr: [], //复选框选中的值
				allChecked: false //是否全选
			}
		},
		methods: {
			// 单个复选框事件
			checkboxChange(e) {
				let values = e.detail.value;
				if (values[0] == 1) {
					this.isChecked = true;
				} else {
					this.isChecked = false;
				}
			},
			// 多选复选框改变事件
			changeCheckbox(e) {
				this.checkedArr = e.detail.value;
				console.log(this.checkedArr)
				// 如果选择的数组中有值，并且长度等于列表的长度，就是全选
				if (this.checkedArr.length > 0 && this.checkedArr.length == this.checkboxData.length) {
					this.allChecked = true;
				} else {
					this.allChecked = false;
				}
			},
			// 全选事件
			allChoose(e) {
				let chooseItem = e.detail.value;
				// 全选
				if (chooseItem[0] == 'all') {
					this.allChecked = true;
					for (let item of this.checkboxData) {
						let itemVal = String(item.value);
						if (!this.checkedArr.includes(itemVal)) {
							this.checkedArr.push(itemVal);
						}
					}
				} else {
					// 取消全选
					this.allChecked = false;
					this.checkedArr = [];
				}
			}
		}
	}
</script>

<style>
</style>
